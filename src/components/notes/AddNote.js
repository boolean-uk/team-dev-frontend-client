import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import client from '../../utils/client'
import Button from '@mui/material/Button'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import SideNavBar from '../sideNavBar/sideNavBar'
import './style.css'

function AddNote({ userData }) {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [note, setNote] = useState({
    content: ''
  })

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
  }, [])

  let userId = 0

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    userId = event.target.userId.value
    client
      .post(`/note/${userId}`, note, true)
      .catch((err) => console.log(err.response))
    alert(`Your note is now added to student ID ${userId}`)
    navigate('/notes')
  }

  const handleNoteChange = (event) => {
    event.preventDefault()
    if (event.target.name === 'userId') {
      userId = event.target.value
    }
    if (event.target.name === 'content') {
      setNote({ content: event.target.value })
    }
  }

  return (
    <div className="content ">
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <div className="mainGridArea ">
        <SideNavBar />
        <section className="main-col">
          <h2>Add a Note</h2>
          <p>Please select a student ID and enter the note text</p>
          <form className="user-form noteInputForm" onSubmit={handleNoteSubmit}>
            <select name="userId" id="userId" onChange={handleNoteChange}>
              {students.map((student, index) => (
                <option
                  key={index}
                  label={`${student.firstName} ${student.lastName} (${student.id})`}
                  variant="outlined"
                  value={student.id}
                ></option>
              ))}
            </select>
            <br />
            <TextField
              className="user-form-input"
              type="text"
              label="Content text"
              variant="outlined"
              name="content"
              onChange={handleNoteChange}
            />
            <br />
            <Button id="user-submit-button" type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default AddNote
