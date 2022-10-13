import { useState } from 'react'

import client from '../../../utils/client'
import SettingsForm from './SettingsForm'
import Header from '../../Header/Header'
import './style.css'

const SettingsPage = ({ userData }) => {
  const [user, setUser] = useState({
    id: userData.id,
    email: userData.email,
    password: userData.password,
    cohortId: userData.cohortId,
    role: userData.role,
    firstName: userData.firstName,
    lastName: userData.lastName,
    biography: userData.biography,
    githubUrl: userData.githubUrl,
    profileUrl: userData.profileUrl
  })

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('user in settingspage')
    console.log(user)
    client
      .patch(`/user/update/${user.id}`, user, true)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className="settings-page">
        <h1>User Settings</h1>
        <SettingsForm
          user={user}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  )
}

export default SettingsPage