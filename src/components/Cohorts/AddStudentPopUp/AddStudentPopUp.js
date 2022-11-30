import { useState } from 'react'
import client from '../../../utils/client'
import './styles.css'

export default function AddStudentPopUp({ setRenderStudentsPopup, cohort }) {
  const [data, setData] = useState({})

  const submitHandler = (event) => {
    event.preventDefault()
    console.log('hello', data)

    // client
    //   .post('/cohorts', data)
    //   .then((res) => console.log('hara', res.data))
    //   .catch((err) => console.log(err.response))
  }

  return (
    <div>
      <form className="cohort-form" onSubmit={submitHandler}>
        <h2>Students without Cohorts</h2>
        <button
          onClick={() => {
            setRenderStudentsPopup(false)
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
