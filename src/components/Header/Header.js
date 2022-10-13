import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import { useNavigate } from 'react-router-dom'

const Header = ({ companyName }) => {
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
            <Button variant="contained">Add Cohort</Button>
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
