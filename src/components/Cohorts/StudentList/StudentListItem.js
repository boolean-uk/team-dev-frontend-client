import { Link } from 'react-router-dom'
import './list.css'

export const StudentListItem = ({ student }) => {
  const fullName = student.firstName + ' ' + student.lastName
  return (
    <li className="student-list-item">
      <Link className="link-student-item" to={`/profile/${student.id}`}>
        <img
          src={`https://avatars.dicebear.com/api/initials/${fullName}.svg`}
          alt="student initials"
        ></img>
        <span className="list-student-name">
          {student.firstName} {student.lastName}
        </span>
      </Link>
      <button className="btn-more-item">
        <span className="material-symbols-outlined">more_horiz</span>
      </button>
    </li>
  )
}
