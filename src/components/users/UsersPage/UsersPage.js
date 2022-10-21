import { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown'
import client from '../../../utils/client'
import './style.css'
import Header from '../../Header/Header'
import SideNavBar from '../../sideNavBar/sideNavBar'

const UsersPage = ({ userData }) => {
  const [users, setUsers] = useState([])
  const [cohorts, setCohorts] = useState([])
  const [response, setResponse] = useState('')

  useEffect(() => {
    client.get('/users').then((res) => {
      setUsers(res.data.data.users)
    })
    client.get('/cohort').then((res) => setCohorts(res.data.data))
  }, [response])

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
  const removeStudent = (student) => {
    client
      .patch(`/user/${student.id}`, { cohortId: 17 })
      .then((res) => setResponse(res))
  }
  console.log(userData)
  const assignCohort = (userId, assignedCohort) => {
    const destination = cohorts.filter((e) => {
      return e.cohortName === assignedCohort.value
    })
    client
      .patch(`/user/${userId}`, { cohortId: destination[0].id })
      .then((res) => setResponse(res))
  }
  return isTeacher() ? (
    <>
      <div className="content ">
        <Header companyName={`Cohort Manager 2.0`} userData={userData} />
        <div className="mainGridArea ">
          <SideNavBar />

          <main className="main-col">
            <section className="users-section  main-col">
              <h1>Cohort member list</h1>
              <div className="cohort-list">
                {cohorts.map((cohort, index) => (
                  <ul key={index} className="cohort-box">
                    <h2 className="cohort-name">
                      {cohort.id === 17 ? 'No cohort' : cohort.cohortName}
                    </h2>
                    {users.map((user, index) =>
                      user.role === 'TEACHER' ? (
                        true
                      ) : user.cohortId === cohort.id ? (
                        <li className="student" key={index}>
                          {`${user.firstName} ${user.lastName}`}
                          {cohort.id === 17 ? (
                            <Dropdown
                              placeholder="Assign student to cohort"
                              className="dropdown"
                              onChange={(e) => assignCohort(user.id, e)}
                              options={cohorts.map((element) =>
                                element.id === 17 ? true : element.cohortName
                              )}
                            />
                          ) : (
                            <button onClick={(e) => removeStudent(user)}>
                              Remove
                            </button>
                          )}
                        </li>
                      ) : (
                        false
                      )
                    )}
                  </ul>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  ) : (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <main>
        <section className="users-section">
          <h1>Cohort member list</h1>
          <ul className="cohort-list">
            {cohorts.map((cohort, index) =>
              cohort.id === userData.cohortId ? (
                <div key={index}>
                  <h1>{cohort.cohortName}</h1>
                  {users.map((user, index) =>
                    user.cohortId === userData.cohortId ? (
                      <li
                        key={index}
                      >{`${user.firstName} ${user.lastName}`}</li>
                    ) : (
                      false
                    )
                  )}
                </div>
              ) : (
                false
              )
            )}
          </ul>
        </section>
      </main>
    </>
  )
}

export default UsersPage
