import client from '../../../utils/client'
import { useEffect, useState } from 'react'
import { StudentListItem } from './StudentListItem'
import './list.css'
import { useParams } from 'react-router-dom'

function StudentsList({
  cohortId,
  renderAddBtn,
  asStudent,
  renderInfo,
  renderAllBtn
}) {
  const [cohortStudents, setCohortStudents] = useState([])
  const [cohort, setCohort] = useState([])
  const [students, setStudents] = useState([])
  const urlParams = useParams()
  cohortId = parseInt(urlParams.id)

  useEffect(() => {
    client.get(`/cohorts/${cohortId}`).then((cohortsData) => {
      const cohortData = cohortsData.data.data
      const startDateMS = Date.parse(cohortData.startDate)
      let startDate = new Date(startDateMS).toString().slice(3, 15)
      const endDateMS = Date.parse(cohortData.endDate)
      let endDate = new Date(endDateMS).toString().slice(3, 15)
      setCohort({ ...cohortData, startDate, endDate })
    })
    client.get('/users').then((usersData) => {
      const allUsers = usersData.data.data.users
      const studentsOnly = allUsers.filter((user) => {
        return user.role === 'STUDENT'
      })
      setStudents(studentsOnly)
      const filteredCohort = studentsOnly.filter((student) => {
        return student.cohortId === cohortId
      })
      setCohortStudents(filteredCohort)
    })
  }, [])

  const moreButtons = (
    <nav className="teacher-nav">
      <button className="add-btn">Add</button>
      <button className="btn-more"> ... </button>
    </nav>
  )

  const fullInfo = (
    <header>
      {cohort.cohortName}
      Cohort {cohort.id}
      <p>
        <u>{cohort.startDate}</u> -<u>{cohort.endDate}</u>
      </p>
    </header>
  )

  const simpleInfo = (
    <header>
      {cohort.cohortName}
      Cohort {cohort.id}
    </header>
  )

  return (
    <>
      {asStudent === true ? <h1>My cohort</h1> : <h1>Students</h1>}

      {renderInfo === false
        ? null
        : renderInfo === 'fullInfo'
        ? fullInfo
        : simpleInfo}
      {renderAddBtn === true ? moreButtons : null}

      <ul className="cohort-list">
        {cohortStudents.map((student, index) => {
          return <StudentListItem key={index} student={student} />
        })}
        {renderAllBtn === true ? (
          <button className="all-btn">All Students</button>
        ) : null}
      </ul>
    </>
  )
}
export default StudentsList
