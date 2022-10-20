import { useState, useEffect } from 'react'
import client from '../../utils/client'
import Button from '@mui/material/Button'
import Header from '../Header/Header'

function NotesPage({ userData }) {
  const [students, setStudents] = useState([])

  useEffect(({ userData }) => {
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
  }, [])

  const getNotesForStudent = (studentId) => {
    client
      .get(`/note/${studentId}`, true)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err.response))
  }
  return (
    <>
      <Header userData={userData} />
      <h2>Teacher Notes for Students</h2>
      {students.map((student, index) => (
        <p key={index}>
          {student.firstName} {student.lastName} (User ID: {student.id})
        </p>
      ))}
    </>
  )
}

export default NotesPage
