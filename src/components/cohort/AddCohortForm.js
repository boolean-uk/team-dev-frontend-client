import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AddCohortForm = ({ handleChange, handleSubmit }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <sub>Please use the following date format (separated with /):</sub>{' '}
      <pre>month/day/year</pre>
      <br />
      <TextField
        className="user-form-input"
        type="text"
        label="Cohort Name"
        variant="outlined"
        name="cohortName"
        onChange={handleChange}
      />
      <TextField
        className="user-form-input"
        type="text"
        label="Start Date"
        variant="outlined"
        name="startDate"
        onChange={handleChange}
      />
      <TextField
        className="user-form-input"
        type="text"
        label="End Date"
        variant="outlined"
        name="endDate"
        onChange={handleChange}
      />
      <Button id="user-submit-button" type="submit" variant="contained">
        Create Cohort
      </Button>
    </form>
  )
}

export default AddCohortForm
