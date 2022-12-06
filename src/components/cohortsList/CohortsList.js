import client from '../../utils/client'
import { useState, useEffect } from 'react'
import CohortListItem from './cohortListItem/CohortListItem'
import './style.css'
import CohortAddPopUp from '../CohortAddPopUp/CohortAddPopUp'

function CohortsList({ renderHeader, renderAddButton, goToExercises = false }) {
  const [loading, setLoading] = useState(true)
  const [renderCohortPopup, setRenderCohortPopup] = useState(false)
  const [cohortsResponse, setCohortsResponse] = useState([])

  useEffect(() => {
    client
      .get('/cohorts')
      .then((res) => {
        setLoading(false)
        setCohortsResponse(res.data)
      })
      .catch((err) =>
        console.error('Error with useEffect, in client.get: ', err.response)
      )
  }, [])

  function updateCohortsList() {
    client
      .get('/cohorts')
      .then((res) => setCohortsResponse(res.data))
      .catch((err) =>
        console.error('Error with useEffect, in client.get: ', err.response)
      )
  }

  const addButton = (
    <button
      className="cohorts-list-add-button"
      onClick={() => {
        // When the state is true, the popup will appear
        setRenderCohortPopup(true)
      }}
    >
      Add Cohort
    </button>
  )

  return (
    <section className="cohorts-list-panel">
      {renderCohortPopup ? (
        <CohortAddPopUp
          updateCohortsList={updateCohortsList}
          setRenderCohortPopup={setRenderCohortPopup}
        />
      ) : null}

      {renderHeader && <h1 className="cohorts-list-header">Cohorts</h1>}

      {renderAddButton ? addButton : null}

      {loading && <span>Loading Cohorts...</span>}
      <div className="list-wrapper">
        {cohortsResponse.length !== 0 &&
          cohortsResponse.data.map((cohort, index) => {
            return (
              <CohortListItem
                cohort={cohort}
                key={index}
                goToExercises={goToExercises}
              />
            )
          })}
      </div>
    </section>
  )
}

export default CohortsList
