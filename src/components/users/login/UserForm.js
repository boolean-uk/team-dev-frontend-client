import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const UserForm = ({ handleSubmit, handleChange }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <TextField
        className="user-form-input"
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        onChange={handleChange}
        style={{ width: '225px', marginBottom: '1em' }}
      />
      <TextField
        className="user-form-input"
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        onChange={handleChange}
        style={{ width: '225px' }}
      />
      <br />
      <Button
        id="user-submit-button"
        type="submit"
        variant="contained"
        style={{ marginLeft: '20px', marginTop: '1em' }}
      >
        Login
      </Button>
    </form>
  )
}

export default UserForm
