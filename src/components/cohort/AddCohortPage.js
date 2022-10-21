import { useState } from 'react'
import client from '../../utils/client'
import AddCohortForm from './AddCohortForm'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import SideNavBar from '../sideNavBar/sideNavBar'

function AddCohortPage({ userData }) {
  // console.log('userData in Add Cohort')

  let navigate = useNavigate()

  const [cohort, setCohort] = useState({
    cohortName: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = (event) => {
    const { value, name } = event.target

    setCohort({
      ...cohort,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    client
      .post('/cohort', cohort, true)
      .then((res) => {
        console.log(res.data)
        alert(`Cohort ${cohort.cohortName} created successfully.`)
        navigate('/posts')
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />

      <h1>Add new cohort</h1>
      <AddCohortForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  )
}

export default AddCohortPage
