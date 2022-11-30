import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const PostForm = ({
  handleSubmit,
  handleChange,
  value,
  helperText,
  loggedInUser
}) => {
  return (
    <section className="new-post-form-section">
      <div className="profile-picture-container">
        <div className="profile-picture">
          {loggedInUser && (
            <img
              src={`https://ui-avatars.com/api/?name=${loggedInUser.firstName}+${loggedInUser.lastName}&background=random&color=fff&rounded=true`}
              alt="avatar"
              height="50px"
            ></img>
          )}
        </div>
      </div>
      <form className="post-form" onSubmit={handleSubmit}>
        <TextField
          className="user-form-input"
          type="text"
          label="What's on your mind?"
          value={value}
          helperText={helperText}
          multiline
          variant="outlined"
          name="content"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Post
        </Button>
      </form>
    </section>
  )
}

export default PostForm
