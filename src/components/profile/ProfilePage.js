import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import client from '../../utils/client'
import Header from '../Header/Header'

import './styles/ProfilePage.css'

function ProfilePage({ loggedInUser }) {
  const [currentUser, setCurrentUser] = useState(null)
  // TODO: Add loading state

  const { id } = useParams()

  useEffect(() => {
    client.get(`/users/${id}`).then((data) => {
      setCurrentUser(data.data.data.user)
    })
    // TODO: Change loading state here
  }, [id])

  if (currentUser === null) {
    return <p> Loading...</p>
  }

  if (currentUser !== null) {
    return (
      <>
        <Header loggedInUser={loggedInUser} />
        <h2>Profile</h2>
        <div className="container">
          <div className="profile-header">
            <img src={currentUser.profileUrl} alt="Profile img" />
            <div>
              <h2>
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p>{currentUser.role}</p>
            </div>
          </div>
          <div className="edit">
            <button className="edit-button">Edit</button>
          </div>
          <div className="basic-info">
            <hr />
            <h2>Basic Info</h2>
            <ul>
              <li>First Name: {currentUser.firstName}</li>
              <li>Last Name: {currentUser.lastName}</li>
              <li>
                <span className="space">Username:</span>
                {currentUser.username
                  ? currentUser.username
                  : 'No username to display'}
              </li>
              <li>
                <span className="space">Github:</span>
                {currentUser.githubUrl
                  ? currentUser.githubUrl
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
                {currentUser.role ? currentUser.role : 'No role to display'}
              </li>
              <li>
                <span className="space">Specialism:</span>
                {currentUser.specialism
                  ? currentUser.specialism
                  : 'No specialism to display'}
              </li>
              <li>
                <span className="space">Start Date:</span>
                {currentUser.startDate
                  ? currentUser.startDate
                  : 'No date to display'}
              </li>
              <li>
                <span className="space">End Date:</span>
                {currentUser.endDate
                  ? currentUser.endDate
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
                {currentUser.email ? currentUser.email : 'No email to display'}
              </li>
              <li>
                <span className="space">Mobile:</span>
                {currentUser.mobile
                  ? currentUser.mobile
                  : 'No number to display'}
              </li>
              <li>
                <span className="space">Password:</span>
                {currentUser.password
                  ? currentUser.password
                  : 'No password to display'}
              </li>
            </ul>
          </div>
          <div className="bio">
            <hr />
            <h2>Bio</h2>
            <p>{currentUser.biography}</p>
          </div>
        </div>
      </>
    )
  }
}

export default ProfilePage
