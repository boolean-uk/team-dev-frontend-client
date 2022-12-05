import { Link } from 'react-router-dom'
import './list.css'
import InitialsBox from '../../InitialsBox/InitialsBox'

export const StudentListItem = ({ student }) => {
  return (
    <li className="student-list-item">
      <Link className="link-student-item" to={`/profile/${student.id}`}>
        <div className="initials-box-wrapper-student">
          <InitialsBox
            firstWord={student.firstName}
            secondWord={student.lastName}
          />
        </div>
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
