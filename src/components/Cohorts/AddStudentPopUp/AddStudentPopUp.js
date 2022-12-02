import { useParams } from 'react-router-dom'
import './addStudentPopUp.css'
import client from '../../../utils/client'

export default function AddStudentPopUp({
  setRenderStudentsPopup,
  students,
  updateStudentsList
}) {
  const studentsWithoutCohort = students.filter((student) => {
    return student.cohortId === null
  })
  const urlCohortId = useParams()
  const intCohortId = {
    cohortId: parseInt(urlCohortId.cohortId)
  }

  console.log('useparams', intCohortId, urlCohortId)
  const handleClick = (studentWC) => {
    client.patch(`/users/${studentWC.id}`, intCohortId).then(() => {
      updateStudentsList()
    })
  }
  return (
    <div className="student-popup">
      <h2>Students without Cohorts</h2>
      <button
        className="exit-button-scapu"
        onClick={() => {
          setRenderStudentsPopup(false)
        }}
      >
        Exit
      </button>
      <ul className="student-popup-ul">
        {studentsWithoutCohort.map((studentWC) => {
          console.log('list', studentWC)
          return (
            <li
              className="student-popup-list"
              onClick={() => handleClick(studentWC)}
            >
              {studentWC.firstName} {studentWC.lastName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
