import client from '../../../utils/client'
import { useEffect, useState } from 'react'
import { StudentListItem } from './StudentListItem'
import './list.css'
import AddStudentPopUp from '../AddStudentPopUp/AddStudentPopUp'

function StudentsList({ renderAddBtn, renderInfo, renderAllBtn, user }) {
  const [cohortStudents, setCohortStudents] = useState([])
  const [cohort, setCohort] = useState([])
  const [students, setStudents] = useState([])
  const [renderStudentsPopup, setRenderStudentsPopup] = useState(false)

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
  }, [cohortId])

  const moreButtons = (
    <nav className="teacher-nav">
      <button
        className="add-btn"
        onClick={() => {
          // When the state is true, the popup will appear
          setRenderStudentsPopup(true)
        }}
      >
        Add
      </button>
      <button className="btn-more"> ... </button>
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
    <>
      {renderStudentsPopup ? (
        <AddStudentPopUp
          setRenderStudentsPopup={setRenderStudentsPopup}
          students={students}
        />
      ) : null}
      {asStudent === true ? <h1>My cohort</h1> : <h1>Students</h1>}

      {renderInfo === 'fullInfo' && fullInfo}
      {renderInfo && renderInfo !== 'fullInfo' && simpleInfo}
      {renderAddBtn === true ? moreButtons : null}

      <ul className="cohort-list">
        {asStudent === true ? mapOfCohort : mapOfStudents}
        {renderAllBtn === true ? (
          <button className="all-btn">All Students</button>
        ) : null}
      </ul>
    </>
  )
}
export default StudentsList
