import client from '../../../utils/client'
import { useEffect, useState } from 'react'
import { StudentListItem } from './StudentListItem'
import './list.css'

function StudentsList({ renderAddBtn, renderInfo, renderAllBtn, user }) {
  const [cohortStudents, setCohortStudents] = useState([])
  const [cohort, setCohort] = useState([])
  const [students, setStudents] = useState([])

  const cohortId = user.cohortId
  const asStudent = user.role === 'STUDENT' ? true : false

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
      <button className="btn-more">
        <span className="material-symbols-outlined">more_horiz</span>
      </button>
    </nav>
  )

  const fullInfo = (
    <header>
      {cohort.cohortName}
      Cohort {cohort.id}
      <div>
        <u>{cohort.startDate}</u> -<u>{cohort.endDate}</u>
      </div>
    </header>
  )

  const simpleInfo = (
    <header>
      {cohort.cohortName}
      Cohort {cohort.id}
    </header>
  )
  const mapOfCohort = cohortStudents.map((student, index) => {
    return <StudentListItem key={index} student={student} />
  })
  const mapOfStudents = students.map((student, index) => {
    return <StudentListItem key={index} student={student} />
  })

  return (
    <div className="container">
      {asStudent === true ? (
        <h1 className="header-list">My cohort</h1>
      ) : (
        <h1 className="header-list">Students</h1>
      )}

      {renderInfo === 'fullInfo' && fullInfo}
      {renderInfo && renderInfo !== 'fullInfo' && simpleInfo}
      {renderAddBtn === true ? moreButtons : null}

      <ul className="students-list">
        {asStudent === true ? mapOfCohort : mapOfStudents}
        {renderAllBtn === true ? (
          <button className="all-btn">All Students</button>
        ) : null}
      </ul>
    </div>
  )
}
export default StudentsList
