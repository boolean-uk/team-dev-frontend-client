import client from '../../../utils/client'
import { useState, useEffect } from 'react'
import CohortListItem from './cohortListItem/CohortListItem'
import './style.css'

function CohortsList() {
  const [renderCohortPopup, setRenderCohortPopup] = useState(false)
  const [cohortsResponse, setCohortsResponse] = useState([])

  // GET the Cohorts List from db
  useEffect(() => {
    client
      .get('/cohorts')
      .then((res) => setCohortsResponse(res.data))
      .catch((err) => console.log(err.response))
  }, [])

  return (
    <section className="cohorts-list-panel">
      {/* Conditional Rendering - To Render the Add Popup #115 */}
      {renderCohortPopup ? (
        <div className="DEBUG-popup">
          <h2>Temporary Add popup</h2>
          <button
            onClick={() => {
              setRenderCohortPopup(false)
            }}
          >
            Close popup
          </button>
        </div>
      ) : null}

      <button
        onClick={() => {
          // When the state is true, the popup will appear
          setRenderCohortPopup(true)
        }}
      >
        Add Cohort
      </button>
      {/* Render CohortListItem mapping though the Cohorts List */}
      {cohortsResponse.length !== 0 ? (
        cohortsResponse.data.map((cohort, index) => {
          return <CohortListItem cohort={cohort} key={index} />
        })
      ) : (
        <p>Loading Cohorts...</p>
      )}
    </section>
  )
}

export default CohortsList
