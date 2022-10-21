import { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown'
import client from '../../../utils/client'
import './style.css'
import SideNavBar from '../../sideNavBar/sideNavBar'
import Header from '../../Header/Header'

const UsersPage = () => {
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
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <main>
        <section className="users-section">
          <h1>Cohort member list</h1>
          <div className="cohort-list">
            {cohorts.map((cohort, index) => (
              <ul key={index} className="cohort-box">
                <h2 className="cohort-name">
                  {cohort.id === 4 ? 'No cohort' : cohort.cohortName}
                </h2>
                {users.map((user, index) =>
                  user.role === 'TEACHER' ? (
                    true
                  ) : user.cohortId === cohort.id ? (
                    <li className="student" key={index}>
                      {`${user.firstName} ${user.lastName}`}
                      {cohort.id === 4 ? (
                        <Dropdown
                          placeholder="Assign to"
                          className="dropdown"
                          onChange={(e) => assignCohort(user.id, e)}
                          options={cohorts.map((element) =>
                            element.id === 4 ? true : element.cohortName
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
                  {users.map((user, index) => (
                    <li key={index}>{`${user.firstName} ${user.lastName}`}</li>
                  ))}
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
