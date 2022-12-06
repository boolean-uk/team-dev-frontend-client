import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import client from '../../utils/client'
import Header from '../Header/Header'
import NavigationRail from '../NavigationRail/NavigationRail'
import './styles/ProfileEdit.css'

function ProfileEdit({ loggedInUser }) {
  const [profileToEdit, setProfileToEdit] = useState(null)
  const [cohorts, setCohorts] = useState(null)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    client.get(`/users/${id}`).then((data) => {
      setProfileToEdit(data.data.data.user)
    })
  }, [id])

  useEffect(() => {
    client.get('/cohorts').then((data) => {
      setCohorts(data.data.data)
    })
  }, [])

  if (profileToEdit === null) {
    return (
      <section className="load">
        <span className="loader"></span>
      </section>
    )
  }

  // Authentication start
  if (loggedInUser.role === 'STUDENT' && loggedInUser.id !== profileToEdit.id) {
    navigate(`/profile/${profileToEdit.id}`)
  }

  let cohortDisabled = false
  let passwordDisabled = false

  if (loggedInUser.role === 'STUDENT') {
    cohortDisabled = true
  }

  if (loggedInUser.role === 'TEACHER' && loggedInUser.id !== profileToEdit.id) {
    passwordDisabled = true
  }

  // Authentication end

  const handleChange = (e) => {
    const name = e.target.name
    let value = e.target.value

    // If the cohortId has changed, we change the value from a string to a number so it can be added to ProfileToEdit correctly
    if (name === 'cohortId') {
      value = Number(value)
    }

    setProfileToEdit({
      ...profileToEdit,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    client
      .patch(`/users/update/${profileToEdit.id}`, { ...profileToEdit })
      .then((data) => {
        client
          .patch(`/users/${profileToEdit.id}`, {
            ...profileToEdit,
            cohortId: profileToEdit.cohortId
          })
          .then((data) => navigate(`/profile/${profileToEdit.id}`))
      })
  }

  return (
    <>
      <Header companyName={'Cohort Manager 2.0'} />

      <NavigationRail user={loggedInUser} />

      <h2 className="profile-h2">Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="profile-container">
          <div className="profile-header">
            <img src={profileToEdit.profileUrl} alt="Profile img" />
            <div>
              <h2>
                {profileToEdit.firstName} {profileToEdit.lastName}
              </h2>
              <p className="profile--display_para">{profileToEdit.role}</p>
            </div>
          </div>
          <div className="edit"></div>

          <div className="basic-info">
            <hr />
            <h2>Basic Info</h2>
            <label htmlFor="profileUrl" className="edit--form__label">
              Profile Picture:{' '}
            </label>
            <input
              className="edit--form__input"
              id="profileUrl"
              name="profileUrl"
              type="url"
              onChange={handleChange}
              placeholder="Insert image URL here"
              value={profileToEdit.profileUrl || ''}
              required
            />
            <label htmlFor="firstName" className="edit--form__label">
              First Name:{' '}
            </label>
            <input
              className="edit--form__input"
              id="firstName"
              name="firstName"
              type="text"
              onChange={handleChange}
              placeholder="John"
              value={profileToEdit.firstName || ''}
              required
            />
            <label htmlFor="lastName" className="edit--form__label">
              Last Name:{' '}
            </label>
            <input
              className="edit--form__input"
              id="lastName"
              name="lastName"
              type="text"
              onChange={handleChange}
              placeholder="Doe"
              value={profileToEdit.lastName || ''}
              required
            />
            <label htmlFor="userName" className="edit--form__label">
              Username:{' '}
            </label>
            <input
              className="edit--form__input"
              id="userName"
              name="userName"
              type="text"
              onChange={handleChange}
              placeholder="JohnDeer"
              value={profileToEdit.userName || ''}
            />
            <label htmlFor="githubUrl" className="edit--form__label">
              Github:{' '}
            </label>
            <input
              className="edit--form__input"
              id="githubUrl"
              name="githubUrl"
              type="url"
              onChange={handleChange}
              placeholder="https://github.com/john-doe"
              value={profileToEdit.githubUrl || ''}
            />
          </div>
          <div className="training-info">
            <hr />
            <h2>Training info</h2>

            <label htmlFor="role" className="edit--form__label">
              Role:{' '}
            </label>
            <select
              className="edit--form__select"
              name="role"
              value={profileToEdit.role || ''}
              onChange={handleChange}
            >
              <option> Select Role...</option>
              <option>TEACHER</option>
              <option>STUDENT</option>
            </select>
            <label htmlFor="specialism" className="edit--form__label">
              Specialism:{' '}
            </label>
            <input
              className="edit--form__input"
              id="specialism"
              name="specialism"
              type="text"
              onChange={handleChange}
              placeholder="Software Developer"
              value={profileToEdit.specialism || ''}
            />
            {cohorts && (
              <>
                <label htmlFor="cohortId" className="edit--form__label">
                  Cohort:{' '}
                </label>
                <select
                  className="edit--form__select"
                  name="cohortId"
                  onChange={handleChange}
                  disabled={cohortDisabled}
                >
                  <option>Select Cohort...</option>
                  {cohorts.map((cohort) => {
                    const { id, cohortName } = cohort
                    return (
                      <option key={id} value={id}>
                        {cohortName}
                      </option>
                    )
                  })}
                </select>
              </>
            )}

            <label htmlFor="startDate" className="edit--form__label">
              Start date:{' '}
            </label>
            <input
              className="edit--form__input"
              id="startDate"
              name="startDate"
              type="date"
              onChange={handleChange}
              value={profileToEdit.startDate || ''}
            />
            <label htmlFor="endDate" className="edit--form__label">
              End date:{' '}
            </label>
            <input
              className="edit--form__input"
              id="endDate"
              name="endDate"
              type="date"
              onChange={handleChange}
              value={profileToEdit.endDate || ''}
            />
          </div>
          <div className="contact-info">
            <hr />
            <h2>Contact info</h2>
            <label htmlFor="email" className="edit--form__label">
              Email:{' '}
            </label>
            <input
              className="edit--form__input"
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="John"
              value={profileToEdit.email || ''}
              required
            />
            <label htmlFor="mobile" className="edit--form__label">
              Mobile:{' '}
            </label>
            <input
              className="edit--form__input"
              id="mobile"
              name="mobile"
              type="tel"
              onChange={handleChange}
              placeholder="07123456789"
              value={profileToEdit.mobile || ''}
            />
            <label htmlFor="password" className="edit--form__label">
              New Password:{' '}
            </label>
            <input
              disabled={passwordDisabled}
              className="edit--form__input"
              id="password"
              name="password"
              type="password"
              placeholder="******"
              onChange={handleChange}
            />
          </div>
          <div className="bio">
            <hr />
            <h2>Bio</h2>
            <label htmlFor="biography" className="edit--form__label">
              Bio:{' '}
            </label>
            <textarea
              className="edit--form__textarea"
              cols={40}
              rows={10}
              id="biography"
              name="biography"
              type="box"
              placeholder="Tell us about yourself!"
              onChange={handleChange}
              value={profileToEdit.biography || ''}
            />
          </div>
        </div>
        <div className="edit-buttons-container">
          <Link to={`/profile/${profileToEdit.id}`}>
            <button className="button edit-buttons" type="submit">
              Cancel
            </button>
          </Link>
          <button className="button edit-buttons" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileEdit
