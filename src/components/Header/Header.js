import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = ({ companyName, userData }) => {
  console.log('userData in Header')
  console.log(userData)

  let navigate = useNavigate()

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN)
    navigate('../', { replace: true })
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
          <Typography>
            <span>{companyName}</span>
          </Typography>
        </Box>

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
            />
          </Box>
          <Box>
            <Button variant="contained">Search User</Button>
          </Box>
        </Box>

        <Box>
          <Stack spacing={2} direction="row">
            <Link to="/add-cohort">
              <Button variant="contained">Add Cohort</Button>
            </Link>

            <Link to="/add-user">
              <Button variant="contained">Add User</Button>
            </Link>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default Header
