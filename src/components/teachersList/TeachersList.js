import client from '../../utils/client'
import { useState, useEffect } from 'react'
import './style.css'
import TeacherListItem from './teacherListItem/TeacherListItem'

function TeachersList({ renderHeading }) {
  const [usersResponse, setUsersResponse] = useState([])
  const [teachers, setTeachers] = useState([])

  // Get Users from db, stores in usersResponse
  useEffect(() => {
    client
      .get('/users')
      .then((res) => {
        setUsersResponse(res.data)
      })
      .catch((err) =>
        console.error('Error with useEffect, in client.get: ', err.response)
      )
  }, [])

  // Filter usersResponse storing new array in teachers
  useEffect(() => {
    // To avoid call while usersResponse is undefined
    if (usersResponse.length === 0) return

    const users = usersResponse.data.users
    const teachersArray = users.filter((user) => {
      if (user.role === 'TEACHER') return true
      else return false
    })
    setTeachers(teachersArray)
  }, [usersResponse])

  return (
    <section className="teachers-list-panel">
      {renderHeading ? <h2>Teachers</h2> : null}

      {teachers.length !== 0 ? (
        <div className="list-wrapper">
          {teachers.map((teacher, index) => {
            return <TeacherListItem teacher={teacher} key={index} />
          })}
        </div>
      ) : (
        <span>Loading Teachers...</span>
      )}
    </section>
  )
}

export default TeachersList
