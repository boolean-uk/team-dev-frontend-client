import { useState } from 'react'
import './Style.css'
import client from '../../utils/client'

export default function CohortAddPopUp({
  updateCohortsList,
  setRenderCohortPopup
}) {
  const [data, setData] = useState({})

  const submitHandler = (event) => {
    event.preventDefault()

    client
      .post('/cohorts', data)
      .then(() => {
        updateCohortsList()
        setRenderCohortPopup(false)
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <form className="cohort-form" onSubmit={submitHandler}>
      <span
        className="exit-button material-symbols-outlined"
        onClick={() => {
          setRenderCohortPopup(false)
        }}
      >
        close
      </span>

      <h2>Add Cohort</h2>

      <label>
        Cohort Name
        <input
          type="text"
          placeholder="Cohort Name"
          onChange={(e) => setData({ ...data, cohortName: e.target.value })}
          required
        />
      </label>
      <div className="cohort-start-end-dates">
        <label>
          Start Date:
          <input
            type="date"
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            onChange={(e) => setData({ ...data, endDate: e.target.value })}
            required
          />
        </label>
      </div>
      <input className="submit-button" type="submit" value="Create" />
    </form>
  )
}
