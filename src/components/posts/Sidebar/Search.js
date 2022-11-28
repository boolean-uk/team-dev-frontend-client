import TextField from '@mui/material/TextField'
import './style.css'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from './icons8-search.svg'

const PostForm = ({ handleSubmit, handleChange }) => {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <TextField
        className="user-form-input"
        type="text"
        variant="outlined"
        name="content"
        placeholder="Search"
        onChange={handleChange}
        InputProps={{
          startAdornment:<InputAdornment position="start">
              <img src={SearchIcon} height="30px" alt="search" />
            </InputAdornment>
          }}
      />
    </form>
  )
}

export default PostForm