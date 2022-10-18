import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const PostForm = ({ handleSubmit, handleChange }) => {
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      {/* <TextField
        className="user-form-input"
        type="text"
        label="New Post"
        variant="outlined"
        name="content"
        onChange={handleChange}
      /> */}
      {/* <Button type="submit" variant="contained">
        Submit
      </Button> */}

      <input
        className="user-form-input"
        type="text"
        label="New Post"
        variant="outlined"
        name="content"
        onChange={handleChange}
        placeholder="New Post"
      ></input>

      <button type="submit" variant="contained">
        Submit
      </button>
    </form>
  )
}

export default PostForm
