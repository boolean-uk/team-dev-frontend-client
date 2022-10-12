import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AddCohortForm = ({ handleChange, handleSubmit }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <TextField
        className="user-form-input"
        type="text"
        label="Cohort Name"
        variant="outlined"
        name="cohortName"
        onChange={handleChange}
      />
      <Button id="user-submit-button" type="submit" variant="contained">
        Create Cohort
      </Button>
    </form>
  )
}

export default AddCohortForm
