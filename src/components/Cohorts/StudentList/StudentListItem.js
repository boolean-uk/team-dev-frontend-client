import { Link } from 'react-router-dom'
import './list.css'

export const StudentListItem = ({ student }) => {
  const fullName = student.firstName + ' ' + student.lastName
  return (
    <div className="student-list-item">
      <img
        src={`https://avatars.dicebear.com/api/initials/:${fullName}.svg`}
        alt="student initials"
      ></img>
      <li className="student-item">
        <Link to={`/users/${student.id}`}>
          {student.firstName} {student.lastName}
        </Link>
        <button className="btn-more">...</button>
      </li>
    </div>
  )
}
