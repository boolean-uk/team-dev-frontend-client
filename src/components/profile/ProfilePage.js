import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import client from '../../utils/client'

function ProfilePage({ loggedInUser }) {
  const [currentUser, setCurrentUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    client.get(`/users/${id}`).then((data) => {
      setCurrentUser(data.data.data.user)
    })
  }, [id])

  return <p>{currentUser && currentUser.firstName}</p>
}

export default ProfilePage
