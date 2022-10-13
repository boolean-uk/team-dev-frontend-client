import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const SettingsForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <TextField
        className="user-settings-form-input"
        label="First Name"
        variant="outlined"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        label="Last Name"
        variant="outlined"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        label="Bio"
        variant="outlined"
        name="biography"
        value={user.biography}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        type="url"
        label="GitHub URL"
        variant="outlined"
        name="githubUrl"
        value={user.githubUrl}
        onChange={handleChange}
      />
      <Button
        id="user-settings-submit-button"
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  )
}

export default SettingsForm
