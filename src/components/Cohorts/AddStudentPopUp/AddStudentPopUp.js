import { useState } from 'react'
import client from '../../../utils/client'
import './addStudentPopUp.css'

export default function AddStudentPopUp({
  setRenderStudentsPopup,
  cohort,
  students
}) {
  console.log('cohort', cohort)
  const studentsWithoutCohort = students.filter((student) => {
    return student.cohortId === null
  })
  console.log('id', studentsWithoutCohort.id)

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
            <li className="student-popup-list">
              {studentWC.firstName}, {studentWC.lastName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
