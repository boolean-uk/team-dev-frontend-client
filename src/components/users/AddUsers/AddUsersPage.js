import { Link } from 'react-router-dom'
import { useState } from 'react'
import AddUserForm from './AddUserForm'
import Header from '../../Header/Header'
import userBlankData from '../utils/userHelpers'

import client from '../../../utils/client'
import './style.css'

const AddUserPage = ({ userData }) => {
  console.log('userData in AddUserPage')
  console.log(userData)

  const [user, setUser] = useState(userBlankData())
  const [registerResponse, setRegisterResponse] = useState('')

  const registerUser = (event) => {
    event.preventDefault()
    client
      .post('/user', user, false)
      .then((res) => setRegisterResponse(res.data))
      .catch((err) => console.log(err.response))
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    setUser({
      ...user,
      [name]: value
    })
  }

  return (
    <>
      <Header userData={userData} />
      <div className="registration-page">
        <AddUserForm handleChange={handleChange} handleSubmit={registerUser} />
      </div>
    </>
  )
}

export default AddUserPage
