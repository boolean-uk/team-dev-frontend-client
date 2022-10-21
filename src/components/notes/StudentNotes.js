import { useState, useEffect } from 'react'
import client from '../../utils/client'

function StudentNotes({ studentId }) {
  const [notesForThisStudent, setNotesForThisStudent] = useState([])

  useEffect(() => {
    client
      .get(`/note/${studentId}`, true)
      .then((res) => {
        if (res.data.data.notes.length > 0) {
          console.log(res.data.data.notes)
          setNotesForThisStudent(res.data.data.notes)
        }
      })
      .catch((err) => console.log(err.response))
  }, [])

  return (
    <div className="studentNotesArea">
      {notesForThisStudent.length > 0 && (
        <>
          <h4 className="notesTitle">Notes: </h4>
          {notesForThisStudent.map((note, index) => (
            <span className="studentNote" key={index}>
              {note.content}
            </span>
          ))}
        </>
      )}
    </div>
  )
}

export default StudentNotes
