import './addStudentPopUp.css'
import client from '../../../utils/client'
import { useEffect, useState } from 'react'

export default function AddStudentPopUp({
  setRenderStudentsPopup,
  students,
  updateStudentsList
}) {
  const [loading, setLoading] = useState(true)
  const [cohorts, setCohorts] = useState([])
  const [allFieldsOk, setAllFieldsOk] = useState(false)
  // const storedData = [] //0: studentId, 1: cohortId
  // const [studentId, setStudentId] = useState()
  // const [cohortId, setCohortId] = useState()
  const [stateData, setStateData] = useState({
    studentId: undefined,
    cohortJson: { cohortId: undefined }
  })

  const studentsWithoutCohort = students.filter((student) => {
    return student.cohortId === null
  })

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

  useEffect(() => {
    if (
      stateData.studentId !== undefined &&
      stateData.cohortJson.cohortId !== undefined
    ) {
      setAllFieldsOk(true)
    }
  }, [stateData])

  const unselectStudents = () => {
    const studentsSelected = Array.from(
      document.getElementsByClassName('student-selected')
    )
    studentsSelected.map((student) => {
      return (student.className = 'student-popup-list')
    })
  }
  const unselectCohorts = () => {
    const cohortsSelected = Array.from(
      document.getElementsByClassName('cohort-selected')
    )
    cohortsSelected.map((cohort) => {
      return (cohort.className = 'cohort-popup-list-item')
    })
  }

  const handleStudentClicked = (student, event) => {
    unselectStudents()
    // storedData[0] = student.id
    setStateData({ ...stateData, studentId: student.id })
    event.target.className = 'student-selected'
    // checkIfBothSelected()
  }
  const handleCohortClicked = (cohort, event) => {
    unselectCohorts()
    // storedData[1] = { cohortId: cohort.id }
    setStateData({ ...stateData, cohortJson: { cohortId: cohort.id } })
    event.target.className = 'cohort-selected'
    // checkIfBothSelected()
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    client
      .patch(`/users/${stateData.studentId}`, stateData.cohortJson)
      .then(() => {
        updateStudentsList()
      })
      .catch((err) => {
        console.error('Error while patching user Cohort: ', err.response)
      })
  }

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

      {loading && <h1>Loading...</h1>}
      <div className="columns-wrapper">
        <ul className="student-popup-ul">
          <h4>Students</h4>
          {studentsWithoutCohort.length !== 0 ? (
            studentsWithoutCohort.map((student, index) => {
              return (
                <li
                  key={index}
                  className="student-popup-list"
                  onClick={(event) => handleStudentClicked(student, event)}
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
          <ul className="cohorts-popup-ul">
            {cohorts.length !== 0 &&
              cohorts.data.map((cohort, index) => {
                return (
                  <li
                    key={index}
                    className="cohort-popup-list-item"
                    onClick={(event) => handleCohortClicked(cohort, event)}
                  >
                    {cohort.cohortName + ' | Cohort ' + cohort.id}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>

      <button
        disabled={allFieldsOk === false ? true : false}
        className="add-popup-student-confirm"
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </form>
  )
}
