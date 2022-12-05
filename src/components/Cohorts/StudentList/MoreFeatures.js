import { useEffect, useState } from 'react'
import client from '../../../utils/client'

// initialState = {
//   cohortId: student.cohortId,
//   role: student.role,
//   firstName: student.firstName,
//   lastName: student.lastName
// }

function MoreFeatures({ student, setShowMoreFeatures }) {
  const [listOfCohorts, setListOfCohorts] = useState([])
  const [selectOptions, setSelectOptions] = useState([])
  const [changedCohortId, setChangedCohortId] = useState([])

  useEffect(() => {
    client
      .get('/cohorts')
      .then((res) => {
        let options = []
        res.data.data.forEach((cohort) => {
          const singleOption = {
            value: cohort.id,
            label: cohort.cohortName
          }
          options.push(singleOption)
        })
        setSelectOptions(options)
      })
      .catch((err) =>
        console.error('Error with useEffect, in client.get: ', err.response)
      )
  }, [])
  const submitHandler = (event) => {
    event.preventDefault()
    client
      .patch('/users', changedCohortId)
      .then(() => {
        setShowMoreFeatures(false)
      })
      .catch((err) => console.log(err.response))
  }
  const handleChange = (e) => {
    const value = e.target.value

    setChangedCohortId({ ...student, cohortId: e.target.value })
  }

  //   console.log(listOfCohorts)
  //   console.log(selectOptions)
  //   console.log(student)
  const fullSelectOptions = [
    { value: 'null', label: 'No Cohort' },
    ...selectOptions
  ]

  //   {value === 'null' && label === 'No Cohort' ? className = 'bold-select': className = 'standart-select' }

  return (
    <form className="form-select-cohort">
      <select className="select-options-cohorts">
        {fullSelectOptions.map((option) => (
          <option
            value={option.value}
            onChange={handleChange}
            selected={option.value === student.cohortId}
          >
            {option.label}
          </option>
        ))}
      </select>
      <nav className="buttons-nav">
        <button
          className="exit-button-more"
          onClick={() => {
            setShowMoreFeatures(false)
          }}
        >
          <span className="material-symbols-outlined">cancel</span>
        </button>
        <button className="confirm-button-list" onClick={() => submitHandler}>
          Confirm
        </button>
      </nav>
    </form>
  )
}
export default MoreFeatures
