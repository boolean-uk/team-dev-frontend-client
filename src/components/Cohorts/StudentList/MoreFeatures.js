import { useEffect, useState } from 'react'
import client from '../../../utils/client'

function MoreFeatures({ student, setShowMoreFeatures, updateStudentsList }) {
  const [selectOptions, setSelectOptions] = useState([])

  const changedCohortId = {}
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
      .patch(`/users/${student.id}`, changedCohortId)
      .then(() => {
        updateStudentsList()
        setShowMoreFeatures(false)
      })
      .catch((err) => console.log(err.response))
  }
  const handleChange = (e) => {
    changedCohortId.cohortId = Number(e.target.value)
    console.log(changedCohortId)
    console.log('value', e.target.value)
    console.log('event on change', e)
  }

  const fullSelectOptions = [
    { value: 'null', label: 'No Cohort' },
    ...selectOptions
  ]

  return (
    <form className="form-select-cohort">
      <select className="select-options-cohorts" onChange={handleChange}>
        {fullSelectOptions.map((option) => (
          <option
            value={option.value}
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
        <button className="confirm-button-list" onClick={submitHandler}>
          Confirm
        </button>
      </nav>
    </form>
  )
}
export default MoreFeatures
