import { useState, useEffect } from 'react'
import client from '../../utils/client'
import Button from '@mui/material/Button'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import StudentNotes from './StudentNotes'

function NotesPage({ userData }) {
  const [students, setStudents] = useState([])

  useEffect(() => {
    client
      .get('/user', true)
      .then((res) => {
        const onlyStudents = res.data.data.users.filter((user) => {
          if (user.role === 'STUDENT') {
            return user
          }
        })
        setStudents(onlyStudents)
      })
      .catch((err) => console.log(err.response))
  }, [students])

  return (
    <>
      <Header userData={userData} />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <h2>Teacher Notes for Students</h2>
      <Link to="/add-note" style={{ textDecoration: 'none' }}>
        <Button
          sx={{
            height: '20px',
            marginTop: '2px',
            fontSize: '13px'
          }}
          className="header-button"
          variant="contained"
        >
          Add Note
        </Button>
      </Link>
      {students.map((student, index) => (
        <p key={index}>
          {student.firstName} {student.lastName} (User ID: {student.id})
          <StudentNotes studentId={student.id} />
        </p>
      ))}
    </>
  )
}

export default NotesPage
