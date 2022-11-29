import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import { Link } from 'react-router-dom'

const Header = ({ companyName, loggedInUser }) => {
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
            <p>{companyName}</p>
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
            <Link to={'/posts'} style={{ textDecoration: 'none' }}>
              <Button variant="contained">Home</Button>
            </Link>
            {loggedInUser && (
              <Link
                to={`/profile/${loggedInUser.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="contained">Profile</Button>
              </Link>
            )}

            <Button variant="contained">Add Cohort</Button>
            <Button variant="contained">Logout</Button>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default Header
