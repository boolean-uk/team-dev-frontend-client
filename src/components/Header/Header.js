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
    <div className="header">
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#e07f72',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100vw',
          padding: '1em'
        }}
      >
        <Box>
          <Typography sx={{ color: 'white' }}>
            <span>{companyName}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '10px'
          }}
        >
          <Box
            className="search-bar"
            sx={{
              backgroundColor: 'white',
              borderRadius: '5px',
              marginTop: '2px',
              height: '20px'
            }}
          >
            <InputBase
              sx={{
                height: '20px'
              }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
          <Box>
            <Button
              sx={{
                height: '20px',
                fontSize: '13px',
                backgroundColor: '#e07f72',
                color: 'white'
              }}
              className="header-button"
              variant="contained"
            >
              Search User
            </Button>
          </Box>
        </Box>

        <Box>
          <Stack spacing={2} direction="row">
            <Button
              sx={{
                height: '20px',
                marginTop: '2px',
                fontSize: '13px'
              }}
              className="header-button"
              variant="contained"
            >
              Add Cohort
            </Button>
            <Button
              sx={{
                height: '20px',
                fontSize: '13px'
              }}
              className="header-button"
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  )
}

export default Header
