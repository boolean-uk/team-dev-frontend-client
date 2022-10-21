import { useState, useEffect } from 'react'
import client from '../../utils/client'

function StudentNotes({ studentId }) {
  const [notesForThisStudent, setNotesForThisStudent] = useState([])

  useEffect(() => {
    client
      .get(`/note/${studentId}`, true)
      .then((res) => {
        if (res.data.data.notes.length > 0) {
          setNotesForThisStudent(res.data.data.notes)
        }
      })
      .catch((err) => console.log(err.response))
  }, [studentId])

  return (
    <>
      {notesForThisStudent.length > 0 && (
        <div className="studentNotesArea">
          <h4 className="notesTitle">Notes: </h4>
          {notesForThisStudent.map((note, index) => (
            <p className="studentNote" key={index}>
              {note.content}
            </p>
          ))}
        </div>
      )}
    </>
  )
}

export default StudentNotes
