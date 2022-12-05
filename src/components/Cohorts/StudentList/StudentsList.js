import client from '../../../utils/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StudentListItem } from './StudentListItem'
import './list.css'
import AddStudentPopUp from '../AddStudentPopUp/AddStudentPopUp'
import { add } from 'date-fns'

function StudentsList({ renderAddBtn, renderInfo, teachersPage, user }) {
  const [cohortStudents, setCohortStudents] = useState([])
  const [cohort, setCohort] = useState([])
  const [students, setStudents] = useState([])
  const [renderStudentsPopup, setRenderStudentsPopup] = useState(false)

  const asStudent = user.role === 'STUDENT' ? true : false
  const urlParams = useParams()

  const cohortId = user.role === 'STUDENT' ? user.cohortId : urlParams.id

  useEffect(() => {
    if (!teachersPage) {
      client
        .get(`/cohorts/${cohortId}`)
        .then((cohortsData) => {
          const cohortData = cohortsData.data.data
          const startDateMS = Date.parse(cohortData.startDate)
          let startDate = new Date(startDateMS).toString().slice(3, 15)
          const endDateMS = Date.parse(cohortData.endDate)
          let endDate = new Date(endDateMS).toString().slice(3, 15)
          setCohort({ ...cohortData, startDate, endDate })
        })
        .catch((err) =>
          console.error('Error with useEffect, in client.get: ', err)
        )
    }

    client
      .get('/users')
      .then((usersData) => {
        const allUsers = usersData.data.data.users
        const studentsOnly = allUsers.filter((user) => {
          return user.role === 'STUDENT'
        })
        setStudents(studentsOnly)
        const filteredCohort = studentsOnly.filter((student) => {
          return student.cohortId === Number(cohortId)
        })

        setCohortStudents(filteredCohort)
      })
      .catch((err) =>
        console.error('Error with useEffect, in client.get: ', err)
      )
  }, [cohortId, teachersPage])

  function updateStudentsList() {
    console.log('Update list')

    client
      .get(`/cohorts/${cohortId}`)
      .then((cohortsData) => {
        const cohortData = cohortsData.data.data
        const startDateMS = Date.parse(cohortData.startDate)
        let startDate = new Date(startDateMS).toString().slice(3, 15)
        const endDateMS = Date.parse(cohortData.endDate)
        let endDate = new Date(endDateMS).toString().slice(3, 15)
        setCohort({ ...cohortData, startDate, endDate })
      })
      .catch((err) =>
        console.error('Error with first updateStudentsList client.get: ', err)
      )

    client
      .get('/users')
      .then((usersData) => {
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
      .catch((err) =>
        console.error('Error with second updateStudentsList client.get: ', err)
      )
  }

  const moreButtons = (
    <nav className="teacher-nav">
      <button
        className="add-btn"
        onClick={() => {
          // When the state is true, the popup will appear
          setRenderStudentsPopup(true)
        }}
      >
        <span className="material-symbols-outlined">add</span>
        <span>Add</span>
      </button>
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
    <div className="student-list-container">
      <div className="students-header">
        {asStudent === true ? (
          <h1 className="header-list">My cohort</h1>
        ) : (
          <h1 className="header-list">Students</h1>
        )}

        {renderStudentsPopup && (
          <AddStudentPopUp
            setRenderStudentsPopup={setRenderStudentsPopup}
            students={students}
            updateStudentsList={updateStudentsList}
          />
        )}

        {renderInfo === 'fullInfo' && fullInfo}
        {renderInfo && renderInfo !== 'fullInfo' && simpleInfo}
        {renderAddBtn === true ? moreButtons : null}
      </div>
      <ul className="students-list">
        {teachersPage === true ? mapOfStudents : mapOfCohort}
      </ul>
    </div>
  )
}
export default StudentsList
