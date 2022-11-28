import { useState } from 'react'
import './Style.css'
import client from '../../utils/client'

export default function CohortAddPopUp({ setRenderCohortPopup }) {
  const [data, setData] = useState({})

  const submitHandler = (event) => {
    event.preventDefault()
    console.log('hello', data)

    // fetch('http://localhost:4000/cohorts', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data)
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error)
    //   })

    client
      .post('/cohorts', data)
      .then((res) => console.log('hara', res.data))
      .catch((err) => console.log(err.response))
  }

  return (
    <div>
      <form className="cohort-form" onSubmit={submitHandler}>
        <h2>Add Cohort</h2>
        <button
          onClick={() => {
            setRenderCohortPopup(false)
          }}
        >
          Exit
        </button>
        <label>
          <input
            type="text"
            placeholder="cohort name"
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
        <label>
          <button>Creat Cohort</button>
        </label>
      </form>
    </div>
  )
}
