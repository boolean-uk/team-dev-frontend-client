import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import client from '../../utils/client'
import Header from '../Header/Header'

import './styles/ProfilePage.css'

function ProfilePage({ loggedInUser }) {
  const [profilePageUser, setProfilePageUser] = useState(null)
  // TODO: Add loading state

  const { id } = useParams()

  useEffect(() => {
    client.get(`/users/${id}`).then((data) => {
      setProfilePageUser(data.data.data.user)
    })
    // TODO: Change loading state here
  }, [id])

  if (profilePageUser === null) {
    return <> </>
  }

  return (
    <>
      <Header loggedInUser={loggedInUser} />
      <h2>Profile</h2>
      <div className="container">
        <div className="profile-header">
          <img src={profilePageUser.profileUrl} alt="Profile img" />
          <div>
            <h2>
              {profilePageUser.firstName} {profilePageUser.lastName}
            </h2>
            <p>{profilePageUser.role}</p>
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
          <hr />
          <h2>Basic Info</h2>
          <ul>
            <li>First Name: {profilePageUser.firstName}</li>
            <li>Last Name: {profilePageUser.lastName}</li>
            <li>
              <span className="space">Username:</span>
              {profilePageUser.username
                ? profilePageUser.username
                : 'No username to display'}
            </li>
            <li>
              <span className="space">Github:</span>
              {profilePageUser.githubUrl
                ? profilePageUser.githubUrl
                : 'No link to display'}
            </li>
          </ul>
        </div>
        <div className="training-info">
          <hr />
          <h2>Training Info</h2>
          <ul>
            <li>
              <span className="space">Role:</span>
              {profilePageUser.role
                ? profilePageUser.role
                : 'No role to display'}
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
          <hr />
          <h2>Contact Info</h2>
          <ul>
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
          <hr />
          <h2>Bio</h2>
          <p>{profilePageUser.biography}</p>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
