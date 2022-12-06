import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Header = ({ companyName, searchBarVisible = true }) => {
  const [query, setQuery] = useState('')

  let nav = useNavigate()

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    localStorage.setItem('loggedInUser', '')
    nav('/', { replace: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = new URLSearchParams({ query })
    nav({ pathname: '/search', search: params.toString() })
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'grey',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100vw',
          padding: '1em'
        }}
      >
        <Box>
          <Typography variant="h5">
            <p>{companyName}</p>
          </Typography>
        </Box>
        {searchBarVisible && (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
              }}
            >
              <Box sx={{ backgroundColor: 'white' }}>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Box>
              <Box>
                <Button type="submit" variant="contained">
                  Search User
                </Button>
              </Box>
            </Box>
          </form>
        )}

        <Box>
          <Button
            variant="contained"
            id="user-signout-button"
            onClick={signOut}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Header
