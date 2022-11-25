import client from '../utils/client'
import { useEffect, useState } from 'react'
import { StudentListItem } from './StudentListItem'

function StudentsList({ cohortId, students, setStudents }) {
  const [cohortStudents, setCohortStudents] = useState([])
  useEffect(() => {
    client.get('/users').then((usersData) => {
      const allUsers = usersData.data.data.users
      console.log('allUsers', allUsers)
      const studentsToSet = allUsers.filter((user) => {
        return user.role === 'STUDENT'
      })
      setStudents(studentsToSet)
      const filteredCohort = studentsToSet.filter((student) => {
        return student.cohortId === cohortId
      })
      setCohortStudents(filteredCohort)
    })
  }, [cohortId])
  return (
    <>
      <header></header>
      <ul className="cohort-list">
        {cohortStudents.map((student, index) => {
          return <StudentListItem index={index} student={student} />
        })}
      </ul>
    </>
  )
}
export default StudentsList
