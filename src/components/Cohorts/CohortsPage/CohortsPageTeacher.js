import { useEffect, useState } from 'react'
import client from '../../../utils/client'
import Header from '../../Header/Header'
import './style.css'

function CohortsPageTeachers({ loggedInUser }) {
  console.log(loggedInUser)
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
  console.log(users)
  console.log(cohorts)
  return (
    <body>
      <header>
        <Header />
      </header>
      {/*may not use nav bar*/}
      <main>
        <nav>
          <ul>
            <li>Test 1</li>
            <li>Test 2</li>
            <li>Test 3</li>
            <li>Test 4</li>
          </ul>
          <hr></hr>
        </nav>

        <section>
          <h2>
            <span className="title1">Cohorts</span>
            <span className="title2"> Students</span>
          </h2>
          <div className="cohortlist">Cohort list</div>
          <div className="studentlist">student list</div>
        </section>
      </main>
    </body>
  )
}

export default CohortsPageTeachers
