import client from '../../utils/client'
import { useState, useEffect } from 'react'
import CohortListItem from './cohortListItem/CohortListItem'
import './style.css'
import CohortAddPopUp from '../CohortAddPopUp/CohortAddPopUp'

function CohortsList({ renderHeader, renderAddButton }) {
  const [renderCohortPopup, setRenderCohortPopup] = useState(false)
  const [cohortsResponse, setCohortsResponse] = useState([])

  // GET the Cohorts List from db
  useEffect(() => {
    client
      .get('/cohorts')
      .then((res) => setCohortsResponse(res.data))
      .catch((err) => console.log(err.response))
  }, [])

  function updateCohortsList() {
    client
      .get('/cohorts')
      .then((res) => setCohortsResponse(res.data))
      .catch((err) => console.log(err.response))
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

      <div className="list-wrapper">
        {cohortsResponse.length !== 0 ? (
          cohortsResponse.data.map((cohort, index) => {
            return <CohortListItem cohort={cohort} key={index} />
          })
        ) : (
          <span>Loading Cohorts...</span>
        )}
      </div>
    </section>
  )
}

export default CohortsList
