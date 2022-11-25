import TextField from '@mui/material/TextField'
import './style.css'

const PostForm = ({ handleSubmit, handleChange }) => {
  return (
    <div className="search-container">
        <div>
    <form className="post-form" onSubmit={handleSubmit}>
      <TextField
        className="user-form-input"
        type="text"
        label="Search for people"
        variant="outlined"
        name="content"
        onChange={handleChange}
      />
    </form>
    </div>
    <div className="search-button-container">
        <div className="search-button"></div>
    </div>
    </div>
  )
}

export default PostForm
