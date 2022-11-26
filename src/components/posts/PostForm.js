import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const PostForm = ({ handleSubmit, handleChange, value, helperText }) => {
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <TextField
        className="user-form-input"
        type="text"
        label="New Post"
        value={value}
        helperText={helperText}
        multiline="default"
        variant="outlined"
        name="content"
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
}

export default PostForm
