import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from '../../utils/client'
import Header from '../Header/Header'

import './styles/ProfilePage.css'

function ProfilePage({ loggedInUser }) {
  const [profilePageUser, setProfilePageUser] = useState(null)
  const [cohort, setCohort] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    client.get(`/users/${id}`).then((data) => {
      setProfilePageUser(data.data.data.user)
    })
  }, [id])

  useEffect(() => {
    if (profilePageUser && profilePageUser.cohortId) {
      client.get(`/cohorts/${profilePageUser.cohortId}`).then((data) => {
        setCohort(data.data.data.cohortName)
      })
    }
  }, [id, profilePageUser])

  if (profilePageUser === null) {
    return (
      <section className="load">
        <span className="loader"></span>
      </section>
    )
  }

  return (
    <>
      <Header loggedInUser={loggedInUser} />
      <h2 className="profile-h2">Profile</h2>
      <div className="container">
        <div className="profile-header">
          <img src={profilePageUser.profileUrl} alt="Profile img" />
          <div>
            <h2>
              {profilePageUser.firstName} {profilePageUser.lastName}
            </h2>
            <p className="profile--display_para">
              {profilePageUser.role} - {cohort ? cohort : 'No cohort'}
            </p>
          </div>
        </div>
        <div className="edit">
          <Link to={`/profile/${profilePageUser.id}/edit`}>
            <button
              className={
                loggedInUser.role !== 'TEACHER' ||
                (loggedInUser.role === 'STUDENT' &&
                  profilePageUser.id !== loggedInUser.id)
                  ? 'button buttonDisabled'
                  : 'button'
              }
            >
              Edit
            </button>
          </Link>
        </div>
        <div className="basic-info">
          <hr className="profile--divider" />
          <h2>Basic Info</h2>
          <ul className="profile--display__list">
            <li>
              {' '}
              <span className="space"> First Name:</span>{' '}
              {profilePageUser.firstName}
            </li>
            <li>
              <span className="space"> Last Name: </span>
              {profilePageUser.lastName}
            </li>
            <li>
              <span className="space">Username:</span>
              {profilePageUser.username
                ? profilePageUser.username
                : 'No username to display'}
            </li>
            <li>
              <span className="space">Github:</span>
              {profilePageUser.githubUrl ? (
                <a
                  href={`${profilePageUser.githubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profilePageUser.githubUrl}
                </a>
              ) : (
                'No link to display'
              )}
            </li>
          </ul>
        </div>
        <div className="training-info">
          <hr className="profile--divider" />
          <h2>Training Info</h2>
          <ul className="profile--display__list">
            <li>
              <span className="space">Role:</span>
              {profilePageUser.role
                ? profilePageUser.role
                : 'No role to display'}
            </li>
            <li>
              <span className="space">Cohort:</span>
              {cohort ? cohort : 'No cohort to display'}
            </li>
            <li>
              <span className="space">Specialism:</span>
              {profilePageUser.specialism
                ? profilePageUser.specialism
                : 'No specialism to display'}
            </li>
            <li>
              <span className="space">Start Date:</span>
              {profilePageUser.startDate
                ? profilePageUser.startDate
                : 'No date to display'}
            </li>
            <li>
              <span className="space">End Date:</span>
              {profilePageUser.endDate
                ? profilePageUser.endDate
                : 'No date to display'}
            </li>
          </ul>
        </div>
        <div className="contact-info">
          <hr className="profile--divider" />
          <h2>Contact Info</h2>
          <ul className="profile--display__list">
            <li>
              <span className="space">Email:</span>
              {profilePageUser.email
                ? profilePageUser.email
                : 'No email to display'}
            </li>
            <li>
              <span className="space">Mobile:</span>
              {profilePageUser.mobile
                ? profilePageUser.mobile
                : 'No number to display'}
            </li>
            <li>
              <span className="space">Password:</span>
              {profilePageUser.password
                ? profilePageUser.password
                : 'No password to display'}
            </li>
          </ul>
        </div>
        <div className="bio">
          <hr className="profile--divider" />
          <h2>Bio</h2>
          <p className="profile--display_para profile--display_bio">
            {profilePageUser.biography}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
