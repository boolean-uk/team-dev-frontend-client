import { Link } from 'react-router-dom'

export const StudentListItem = ({ index, student }) => {
  return (
    <li className="student" key={index}>
      <Link to={`/users/${student.id}`}>
        {student.firstName} {student.lastname}
      </Link>
    </li>
  )
}
