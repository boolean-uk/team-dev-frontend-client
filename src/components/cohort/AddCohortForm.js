import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './styles.css'

const AddCohortForm = ({ handleChange, handleSubmit }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <sub>Please use month/day/year (separated with /):</sub> <br />
      <TextField
        className="user-form-input"
        type="text"
        label="Cohort Name"
        variant="outlined"
        name="cohortName"
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        className="user-form-input"
        type="text"
        label="Start Date"
        variant="outlined"
        name="startDate"
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        className="user-form-input"
        type="text"
        label="End Date"
        variant="outlined"
        name="endDate"
        onChange={handleChange}
      />
      <br />
      <br />
      <Button id="user-submit-button" type="submit" variant="contained">
        Create Cohort
      </Button>
    </form>
  )
}

export default AddCohortForm
