import './addStudentPopUp.css'
import client from '../../../utils/client'
import CohortsList from '../../cohortsList/CohortsList'
import { useEffect, useState } from 'react'

export default function AddStudentPopUp({
  setRenderStudentsPopup,
  students,
  updateStudentsList
}) {
  const [loading, setLoading] = useState(true)
  const [cohorts, setCohorts] = useState([])

  const studentsWithoutCohort = students.filter((student) => {
    return student.cohortId === null
  })
  const intCohortId = {
    cohortId: Number(1)
  }

  const handleStudentClicked = (student) => {
    client
      .patch(`/users/${student.id}`, intCohortId)
      .then(() => {
        updateStudentsList()
      })
      .catch((err) => {
        console.error('Error while patching user Cohort: ', err.response)
      })
  }
  const handleCohortClicked = (cohort) => {
    console.log('Cohort clicked: ', cohort)
  }

  const handleSubmit = () => {
    client
      .patch(`/users/${2}`, intCohortId)
      .then(() => {
        updateStudentsList()
      })
      .catch((err) => {
        console.error('Error while patching user Cohort: ', err.response)
      })
  }

  useEffect(() => {
    client
      .get('/cohorts')
      .then((res) => {
        setLoading(false)
        setCohorts(res.data)
      })
      .catch((err) =>
        console.error('Error with useEffect, in client.get: ', err.response)
      )
  }, [])

  return (
    <form className="student-popup">
      <h1 className="add-popup-header">Select a Student and then a Cohort</h1>
      <button
        className="exit-button-scapu"
        onClick={() => {
          setRenderStudentsPopup(false)
        }}
      >
        Exit
      </button>

      <div className="columns-wrapper">
        <ul className="student-popup-ul">
          <h4>Students</h4>
          {studentsWithoutCohort.length !== 0 ? (
            studentsWithoutCohort.map((student, index) => {
              return (
                <li
                  key={index}
                  className="student-popup-list"
                  onClick={() => handleStudentClicked(student)}
                >
                  {student.firstName} {student.lastName}
                </li>
              )
            })
          ) : (
            <h4>There is no Students without Cohort.</h4>
          )}
        </ul>

        <div className="cohorts-list-all-wrapper">
          <div className="cohorts-list-popup-wrapper">
            {cohorts.length !== 0 &&
              cohorts.data.map((cohort, index) => {
                return (
                  <div
                    key={index}
                    className="cohort-item-panel"
                    onClick={() => handleCohortClicked(cohort)}
                  >
                    <span className="cohort-name">{cohort.cohortName}</span>
                    <span className="cohort-id">Cohort {cohort.id}</span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      <button className="add-popup-student-confirm" onSubmit={handleSubmit}>
        Confirm
      </button>
    </form>
  )
}
