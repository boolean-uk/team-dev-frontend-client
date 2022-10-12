import { useState, useEffect } from 'react'
import SettingsForm from './SettingsForm'
import Header from '../../Header/Header'
import client from '../../../utils/client'
import './style.css'

const SettingsPage = ({ currentUser, setCurrentUser }) => {
  const [user, setUser] = useState(currentUser)

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
    client
      .patch(`/user/${user.id}`, user, true)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response))
  }
  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className="settings-page">
        <h1>User Settings</h1>
        <SettingsForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          user={user}
        />
      </div>
    </>
  )
}

export default SettingsPage
