import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AddUserForm = ({ handleSubmit, handleChange, cohorts }) => {
  const roleOptions = [
    { value: 'STUDENT', label: 'Student' },
    { value: 'TEACHER', label: 'Teacher' }
  ]

  console.log(cohorts)

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <select
        name="role"
        id="role"
        onChange={handleChange}
        className="user-form-input"
      >
        {roleOptions.map((roleOption, index) => (
          <option key={index} value={roleOption.value}>
            {roleOption.label}
          </option>
        ))}
      </select>
      <br />
      <br />
      <select
        name="cohortId"
        id="cohortId"
        onChange={handleChange}
        className="user-form-input"
      >
        {cohorts.map((cohort, index) => (
          <option key={index} value={cohort.id}>
            {cohort.cohortName} (Cohort ID: {cohort.id})
          </option>
        ))}
      </select>
      <br />
      <br />
      <TextField
        className="user-form-input"
        label="First Name"
        variant="outlined"
        name="firstName"
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        className="user-form-input"
        label="Last Name"
        variant="outlined"
        name="lastName"
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        className="user-form-input"
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        className="user-form-input"
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        className="user-form-input"
        label="Bio"
        variant="outlined"
        name="biography"
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        className="user-form-input"
        type="url"
        label="GitHub URL"
        variant="outlined"
        name="githubUrl"
        onChange={handleChange}
      />
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
}

export default AddUserForm
