import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import client from '../../utils/client'
import Header from '../Header/Header'
import './styles/ProfileEdit.css'

function ProfileEdit({ loggedInUser }) {
  const [profileToEdit, setProfileToEdit] = useState(null)
  console.log(profileToEdit)

  const { id } = useParams()

  useEffect(() => {
    client.get(`/users/${id}`).then((data) => {
      setProfileToEdit(data.data.data.user)
    })
  }, [id])

  if (profileToEdit === null) {
    return <> loading </>
  }

  return (
    <>
      <Header loggedInUser={loggedInUser} />
      <h2>Profile</h2>
      {/* TODO: Add form control for form */}
      <form>
        <div className="container">
          <div className="profile-header">
            <img src={profileToEdit.profileUrl} alt="Profile img" />
            <div>
              <h2>
                {profileToEdit.firstName} {profileToEdit.lastName}
              </h2>
              <p>{profileToEdit.role}</p>
            </div>
          </div>
          <div className="edit"></div>

          <div className="basic-info">
            <hr />
            <h2>Basic Info</h2>
            <label htmlFor="profileUrl">Profile Picture: </label>
            <input
              id="profileUrl"
              name="profileUrl"
              type="url"
              // TODO: Add form control
              placeholder="Insert image URL here"
              value={profileToEdit.profileUrl}
              required
            />
            <label htmlFor="firstName">First Name: </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              // TODO: Add form control
              placeholder="John"
              value={profileToEdit.firstName}
              required
            />
            <label htmlFor="lastName">Last Name: </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              // TODO: Add form control
              placeholder="Doe"
              value={profileToEdit.lastName}
              required
            />
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              name="username"
              type="text"
              // TODO: Add form control
              placeholder="JohnDeer"
              value={profileToEdit.userName}
              required
            />
            <label htmlFor="githubUrl">Github: </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              // TODO: Add form control
              placeholder="https://github.com/john-doe"
              value={profileToEdit.githubUrl}
              required
            />
          </div>
          <div className="training-info">
            <hr />
            <h2>Training info</h2>
            {/* TODO: Add form control for select */}
            <label htmlFor="role">Role: </label>
            <select name="role" value={profileToEdit.role}>
              <option> Select Role...</option>
              <option>TEACHER</option>
              <option>STUDENT</option>
            </select>
            <label htmlFor="specialism">Specialism: </label>
            <input
              id="specialism"
              name="specialism"
              type="text"
              // TODO: Add form control
              placeholder="Software Developer"
              value={profileToEdit.specialism}
              required
            />
            <label htmlFor="cohort">Cohort: </label>
            <input
              id="cohort"
              name="cohort"
              type="text"
              // TODO: Add form control
              placeholder="Cohort 8"
              value={profileToEdit.cohort}
              required
            />
            <label htmlFor="startDate">Start date: </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              // TODO: Add form control
              value={profileToEdit.startDate}
              required
            />
            <label htmlFor="endDate">End date: </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              // TODO: Add form control
              value={profileToEdit.endDate}
              required
            />
          </div>
          <div className="contact-info">
            <hr />
            <h2>Contact info</h2>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              name="email"
              type="email"
              // TODO: Add form control
              placeholder="John"
              value={profileToEdit.email}
              required
            />
            <label htmlFor="mobile">Mobile: </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              // TODO: Add form control
              placeholder="07123456789"
              value={profileToEdit.mobile}
              required
            />
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              // TODO: Add form control
              value={profileToEdit.password}
              required
            />
          </div>
          <div className="bio">
            <hr />
            <h2>Bio</h2>
            <label htmlFor="biography">Bio: </label>
            <textarea
              cols={40}
              rows={11}
              id="biography"
              name="biography"
              type="box"
              placeholder="Tell us about yourself!"
              // TODO: Add form control
              value={profileToEdit.biography}
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
