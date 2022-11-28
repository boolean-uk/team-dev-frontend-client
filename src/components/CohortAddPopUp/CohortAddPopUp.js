import { useState } from 'react'
import './Style.css'
import client from '../../utils/client'
import { useNavigate } from 'react-router-dom'

export default function CohortAddPopUp({ setRenderCohortPopup }) {
  const navigate = useNavigate()
  const [data, setData] = useState({})

  const submitHandler = (event) => {
    event.preventDefault()
    console.log('hello', data)

    client
      .post('/cohorts', data)
      .then(() => setRenderCohortPopup(false))
      .catch((err) => console.log(err.response))
    navigate('/cohorts')
  }

  return (
    <form className="cohort-form" onSubmit={submitHandler}>
      {/* Exit Button */}
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
        />
      </label>

      <label>
        Start Date:
        <input
          type="date"
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
        />
      </label>

      <label>
        End Date:
        <input
          type="date"
          onChange={(e) => setData({ ...data, endDate: e.target.value })}
        />
      </label>

      <input className="submit-button" type="submit" value="Create" />
    </form>
  )
}
