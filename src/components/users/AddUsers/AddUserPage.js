import { useState, useEffect } from 'react'
import AddUserForm from './AddUserForm'
import Header from '../../Header/Header'
import SideNavBar from '../../sideNavBar/sideNavBar'
import './styles.css'

import client from '../../../utils/client'
import '../registration/style.css'

const AddUserPage = ({ userData }) => {
  const [cohorts, setCohorts] = useState([])

  const [addedUser, setAddedUser] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    biography: '',
    githubUrl: '',
    profileUrl: ''
  })

  useEffect(() => {
    client.get('/cohort').then((res) => {
      setCohorts(res.data.data)
    })
  }, [])

  const registerUser = (event) => {
    event.preventDefault()

    setAddedUser({
      ...addedUser,
      role: event.target.role.value,
      cohortId: event.target.role.value
    })

    client
      .post('/user', addedUser, true)
      .then((res) => {
        alert(
          `Registration of new user ${res.data.data.user.firstName} ${res.data.data.user.lastName} (user ID: ${res.data.data.user.id}) successful.`
        )
      })
      .catch((err) => console.log(err.response))
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    setAddedUser({
      ...addedUser,
      [name]: value
    })
  }

  return (
    <>
      <div className="content ">
        <Header companyName={`Cohort Manager 2.0`} userData={userData} />
        <div className="mainGridArea ">
          <SideNavBar />
          <div className="registration-page main-col">
            <div className="formStyle">
              <h2>Add a new User</h2>
              <p>Please also set their role (TEACHER or STUDENT).</p>
              <AddUserForm
                handleChange={handleChange}
                handleSubmit={registerUser}
                cohorts={cohorts}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUserPage
