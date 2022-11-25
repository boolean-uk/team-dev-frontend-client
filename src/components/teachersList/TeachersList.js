import client from '../../utils/client'
import { useState, useEffect } from 'react'
import './style.css'
import TeacherListItem from './teacherListItem/TeacherListItem'

function TeachersList({ renderHeader }) {
  const [usersResponse, setUsersResponse] = useState([])

  useEffect(() => {
    client
      .get('/users')
      .then((res) => setUsersResponse(res.data))
      .catch((err) => console.log(err.response))
  }, [])

  const header = <h2>Teachers</h2>

  return (
    <section className="teachers-list-panel">
      {renderHeader ? header : null}

      {usersResponse.length !== 0 ? (
        <div className="list-wrapper">
          {usersResponse.data.users.map((user, index) => {
            return <TeacherListItem user={user} key={index} />
          })}
        </div>
      ) : (
        <span>Loading Teachers...</span>
      )}
    </section>
  )
}

export default TeachersList
