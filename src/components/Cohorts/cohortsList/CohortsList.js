import client from '../../../utils/client'
import { useState, useEffect } from 'react'

function CohortsList() {
  const [renderCohortPopup, setRenderCohortPopup] = useState(false)
  const [cohortsResponse, setCohortsResponse] = useState([])

  useEffect(() => {
    client
      .get('/cohorts')
      .then((res) => {
        setCohortsResponse(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err.response))
  }, [])

  return (
    <section>
      <button>Add Cohort</button>
      {/* Render CohortListItem mapping though the Cohorts List */}
      {cohortsResponse.length !== 0 ? (
        cohortsResponse.data.map((cohort, index) => {
          return (
            <div key={index}>
              <p>CohortName: {cohort.cohortName}</p>
            </div>
          )
        })
      ) : (
        <p>Loading Cohorts...</p>
      )}
    </section>
  )
}

export default CohortsList
