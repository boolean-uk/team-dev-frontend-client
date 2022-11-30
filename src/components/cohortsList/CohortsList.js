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

  const header = <h2>Cohorts</h2>
  const addButton = (
    <button
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
      {/* Conditional Rendering - Add Popup #115 */}

      {/* {renderCohortPopup ? temporaryAddPopup : null} */}
      {renderCohortPopup ? (
        <CohortAddPopUp setRenderCohortPopup={setRenderCohortPopup} />
      ) : null}

      {/* Conditional Rendering - Header */}
      {renderHeader ? header : null}

      {/* Conditional Rendering - Add Button */}
      {renderAddButton ? addButton : null}

      {/* Render List */}
      <div className="list-wrapper">
        {/* Render CohortListItem mapping though the Cohorts List */}
        {/* If not empty, continue with map */}
        {cohortsResponse.length !== 0 ? (
          cohortsResponse.data.map((cohort, index) => {
            return <CohortListItem cohort={cohort} key={index} />
          })
        ) : (
          <p>Loading Cohorts...</p>
        )}
      </div>
    </section>
  )
}

export default CohortsList
