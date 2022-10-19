import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../../../utils/client'
import './style.css'

import Header from '../../Header/Header'

const UsersPage = ({ userData }) => {
  const [users, setUsers] = useState([])
  const [cohorts, setCohorts] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    client.get('/users').then((res) => {
      setUsers(res.data.data.users)
      console.log(res.data.data.users)
    })
    const cohortArr = users.filter((user) => user.cohortId)
    console.log(cohortArr)
  }, [])

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    navigate('../', { replace: true })
  }

  if (!users) {
    return <></>
  }

  function checkLength(user) {
    if (user.biography) {
      if (user.biography.length > 70) {
        let newBio = user.biography.slice(0, 70) + '...'
        return newBio
      }
      return user.biography
    }
    return 'No biography available'
  }

  function checkGitURL(user) {
    if (!user.githubUrl) {
      return 'No link available'
    }
    return <a href={`${user.githubUrl}`}>{user.githubUrl}</a>
  }

  console.log('user data:', userData)
  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <main>
        <section className="users-section">
          <button id="user-signout-button" onClick={signOut}>
            sign out
          </button>
          <h1>Cohort member list</h1>
          <ul className="users-list">
            {/* <li className="user-item">
              <div>{`Full Name`}</div>
              <div>{`Email`}</div>
              <div>{`Biography`}</div>
            </li> */}
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <div>{`${user.firstName} ${user.lastName}`}</div>
                <div>{`${user.email}`}</div>
                <div>{`${checkLength(user)}`}</div>
                <div>{checkGitURL(user)}</div>

                {/* <div>
                  <button className="user-button">Edit</button>
                  <button className="user-button">Delete</button>
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
