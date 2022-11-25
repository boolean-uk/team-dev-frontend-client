import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const PostForm = ({ handleSubmit, handleChange }) => {
  return (
    <section className="new-post-form-section">
      <div className="profile-picture-container">
        <div className='"profile-picture'>FA</div>
      </div>
      <form className="post-form" onSubmit={handleSubmit}>
        <TextField
          className="user-form-input"
          type="text"
          label="New Post"
          variant="outlined"
          name="content"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </section>
  )
}

export default PostForm
