import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../../../utils/client'
import './style.css'
import SideNavBar from '../../sideNavBar/sideNavBar'
import Header from '../../Header/Header'

const UsersPage = ({ userData }) => {
  const [users, setUsers] = useState([])
  const [cohorts, setCohorts] = useState([])
  const ownCohort = cohorts.filter(
    (cohort, index) => index + 1 === userData.cohortId
  )
  const cohortTemplate = [
    {
      cohort: 'Cohort 1',
      users: []
    },
    {
      cohort: 'Cohort 2',
      users: []
    },
    {
      cohort: 'Cohort 3',
      users: []
    },
    {
      cohort: 'Cohort 4',
      users: []
    },
    {
      cohort: 'Cohort 5',
      users: []
    },
    {
      cohort: 'No cohort assigned',
      users: []
    }
  ]
  let navigate = useNavigate()

  useEffect(() => {
    client.get('/users').then((res) => {
      // setUsers(res.data.data.users)
      console.log(res)
      filterUsersIntoCohorts(
        res.data.data.users.sort(function (a, b) {
          return a.id - b.id
        })
      )
    })
  }, [])

  const filterUsersIntoCohorts = (users) => {
    const updatedCohorts = [...cohortTemplate]
    for (const user of users) {
      switch (user.cohortId) {
        case 1:
          console.log(user)
          updatedCohorts[0].users.push(user)
          break
        case 2:
          console.log(user)
          updatedCohorts[1].users.push(user)
          break
        case 3:
          console.log(user)
          updatedCohorts[2].users.push(user)

          break
        case 4:
          console.log(user)
          updatedCohorts[3].users.push(user)

          break
        case 5:
          console.log(user)
          updatedCohorts[4].users.push(user)

          break
        default:
          console.log('no cohort: ', user)
          updatedCohorts[5].users.push(user)
      }
    }
    setCohorts(updatedCohorts)
    console.log(updatedCohorts, cohorts)
  }

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    navigate('../', { replace: true })
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

  const isTeacher = () => {
    return sessionStorage.getItem('userRole') === 'TEACHER'
  }

  if (!users) {
    return (
      <>
        <span>No users</span>
      </>
    )
  }

  return isTeacher() ? (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <section className="users-section mainGridArea">
        <SideNavBar />
        <main className="main-col">
          <h1>Cohort member list</h1>
          <ul className="cohort-list">
            {cohorts.map((cohort, index) => (
              <>
                <li key={index}>
                  <div className="cohort-box">
                    <h1>{cohort.cohort}</h1>
                    <div className="content">
                      {cohort.users.map((user, index) => (
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                      ))}
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </main>
      </section>
    </>
  ) : (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <section className="users-section mainGridArea">
        <SideNavBar />
        <main className="main-col">
          <h1>Cohort member list</h1>
          <ul className="cohort-list">
            {ownCohort.map((cohort, index) => (
              <>
                <li key={index}>
                  <div className="cohort-box">
                    <h1>{cohort.cohort}</h1>
                    <div className="content">
                      {cohort.users.map((user, index) => (
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                      ))}
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </main>
      </section>
    </>
  )
}

export default UsersPage
