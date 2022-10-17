import { useState, useEffect } from 'react'
import AddUserForm from './AddUserForm'
import Header from '../../Header/Header'
import userBlankData from '../utils/userHelpers'

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
  const [registerResponse, setRegisterResponse] = useState('')

  const registerUser = (event) => {
    event.preventDefault()
    console.log(addedUser)
    client
      .post('/user', addedUser, true)
      .then((res) => setRegisterResponse(res.data))
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
