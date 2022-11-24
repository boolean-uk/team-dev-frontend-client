import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProfilePage({ loggedInUser, token }) {
  const [currentUser, setCurrentUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    fetch(`http://localhost:4000/users/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCurrentUser(data.data.user)
      })
  }, [id, token])

  return <p>{currentUser && currentUser.firstName}</p>
}

export default ProfilePage
