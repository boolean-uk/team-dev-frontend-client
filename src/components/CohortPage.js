import StudentsList from './StudentsList'
import { useParams } from 'react-router-dom'

function CohortPage({ students, setStudents }) {
  const urlParams = useParams()
  return (
    <StudentsList
      students={students}
      setStudents={setStudents}
      cohortId={parseInt(urlParams.id)}
    />
  )
}

export default CohortPage
