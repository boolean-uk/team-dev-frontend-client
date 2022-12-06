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
  const urlCohortId = useParams() // .id = "3"
  const intCohortId = {
    cohortId: Number(urlCohortId.id)
  }

  const handleClick = (student) => {
    client
      .patch(`/users/${student.id}`, intCohortId)
      .then(() => {
        updateStudentsList()
      })
      .catch((err) => {
        console.error('Error while patching user Cohort: ', err.response)
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
        {studentsWithoutCohort.length !== 0 ? (
          studentsWithoutCohort.map((student, index) => {
            return (
              <li
                key={index}
                className="student-popup-list"
                onClick={() => handleClick(student)}
              >
                {student.firstName} {student.lastName}
              </li>
            )
          })
        ) : (
          <h4>There is no Students without Cohort.</h4>
        )}
      </ul>
    </div>
  )
}
