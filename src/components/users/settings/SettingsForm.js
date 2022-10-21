import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SideNavBar from '../../sideNavBar/sideNavBar'

const SettingsForm = ({ handleChange, handleSubmit, user }) => {
  // const { userData } = props
  return (
    <div className="mainGridArea">
      <SideNavBar />
      <form className="user-form main-col " onSubmit={handleSubmit}>
        <h1>User Settings</h1>
        <TextField
          className="user-settings-form-input"
          label="First Name"
          variant="outlined"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          className="user-settings-form-input"
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />{' '}
        <br />
        <br />
        <TextField
          className="user-settings-form-input"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          value={user.email}
          onChange={handleChange}
        />{' '}
        <br />
        <br />
        <TextField
          className="user-settings-form-input"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          value={user.password}
          onChange={handleChange}
        />{' '}
        <br />
        <br />
        <TextField
          className="user-settings-form-input"
          label="Bio"
          variant="outlined"
          name="biography"
          value={user.biography}
          onChange={handleChange}
        />{' '}
        <br />
        <br />
        <TextField
          className="user-settings-form-input"
          type="url"
          label="GitHub URL"
          variant="outlined"
          name="githubUrl"
          value={user.githubUrl}
          onChange={handleChange}
        />{' '}
        <br />
        <br />
        <Button
          id="user-settings-submit-button"
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default SettingsForm
