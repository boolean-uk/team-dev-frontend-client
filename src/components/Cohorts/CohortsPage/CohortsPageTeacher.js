import { useEffect, useState } from 'react'
import client from '../../../utils/client'
import Header from '../../Header/Header'
import CohortsList from '../../cohortsList/CohortsList'
import './style.css'

function CohortsPageTeachers({ loggedInUser }) {
  const [users, setUsers] = useState([])
  const [cohorts, setCohorts] = useState([])
  useEffect(() => {
    client
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.response))
  }, [])

  useEffect(() => {
    client
      .get('/cohorts')
      .then((res) => setCohorts(res.data))
      .catch((err) => console.log(err.response))
  }, [])

  return (
    <>
      {/*Header may change*/}
      <Header />

      {/*may not use nav bar*/}
      <main>
        <nav>
          <ul>
            <li>
              <span className="material-symbols-outlined">Home</span>Home
            </li>
            <li>
              <span className="material-symbols-outlined">Account_Circle</span>
              Profile
            </li>
            <li>
              <span className="material-symbols-outlined">School</span>Cohorts
            </li>
            <li>
              <span className="material-symbols-outlined">Task</span>Exercises
            </li>

            <hr></hr>
            <li>
              <span className="material-symbols-outlined">Notes</span>Notes
            </li>
            <li>
              <span className="material-symbols-outlined">Analytics</span>Logs
            </li>
          </ul>
        </nav>

        <section className="content">
          <h2>
            <span className="title1">Cohorts</span>
            <span className="title2"> Students</span>
          </h2>

          <CohortsList
            className="cohortlist"
            renderHeader={true}
            renderAddButton={true}
          />

          <div className="studentlist">
            student list component, should appear when a cohort is selected
          </div>
        </section>
      </main>
    </>
  )
}

export default CohortsPageTeachers
