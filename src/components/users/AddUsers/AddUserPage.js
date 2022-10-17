import { useState } from 'react'
import AddUserForm from './AddUserForm'
import Header from '../../Header/Header'

import client from '../../../utils/client'
import '../registration/style.css'

const AddUserPage = ({ userData }) => {
  console.log('userData in AddUserPage')
  console.log(userData)

  const [addedUser, setAddedUser] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    biography: '',
    githubUrl: '',
    profileUrl: ''
  })

  const registerUser = (event) => {
    event.preventDefault()

    setAddedUser({
      ...addedUser,
      role: event.target.role.value
    })

    client
      .post('/user', addedUser, true)
      .then((res) => {
        console.log(res.data.data)
        alert(
          `Registration of new user ${res.data.data.user.firstName} ${res.data.data.user.lastName} (ID: ${res.data.data.user.id}) successful. Please add them to a cohort.`
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
      <Header userData={userData} />
      <div className="registration-page">
        <h2>Add a new User</h2>
        <p>Please also set their role (TEACHER or STUDENT).</p>
        <AddUserForm handleChange={handleChange} handleSubmit={registerUser} />
      </div>
    </>
  )
}

export default AddUserPage
