import { useState, useEffect } from 'react'
import client from '../../utils/client'
import Button from '@mui/material/Button'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

function NotesPage({ userData }) {
  const [students, setStudents] = useState([])

  useEffect(() => {
    client
      .get('/user', true)
      .then((res) => {
        const onlyStudents = res.data.data.users.filter((user) => {
          if (user.role === 'STUDENT') {
            const notesForThisStudent = getNotesForStudent(user.id)
            user.notes = notesForThisStudent
            return user
          }
        })
        setStudents(onlyStudents)
      })
      .catch((err) => console.log(err.response))
  }, [])

  const getNotesForStudent = (studentId) => {
    client
      .get(`/note/${studentId}`, true)
      .then((res) => {
        return res.data.data.content
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <>
      <Header userData={userData} />
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
          <div class="studentNotesArea">
            {student.notes > 0 && (
              <>
                <h4>Notes</h4>
                {student.notes.map((note, index) => (
                  <div class="studenNote" key={index}>
                    {note}
                  </div>
                ))}
              </>
            )}
          </div>
        </p>
      ))}
    </>
  )
}

export default NotesPage
