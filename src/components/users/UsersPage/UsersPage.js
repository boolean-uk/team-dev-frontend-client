import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../../../utils/client'

import Header from '../../Header/Header'

const UsersPage = (props) => {
  const { userData } = props

  const [users, setUsers] = useState({ content: '' })
  let navigate = useNavigate()

  useEffect(() => {
    client.get('/users').then((res) => {
      if (res.data?.data?.users?.length) {
        setUsers(res.data.data.users)
      }
    })
  }, [])

  console.log('users is: ', users)

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    navigate('../', { replace: true })
  }

  console.log('users is: ', users)
  // console.log('firstname is: ', users[0].firstName)

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <main>
        <section className="posts-section">
          <button id="user-signout-button" onClick={signOut}>
            sign out
          </button>
          <ul className="posts-list">
            {users.map((user, index) => (
              <li key={index} className="post-item">
                <div className="post-item-user">
                  {`${user.firstName} ${user.lastName}`}
                </div>
                {/* <div className="post-item-content">
                  {`${user.firstName} ${user.lastName}`}
                </div> */}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default UsersPage
