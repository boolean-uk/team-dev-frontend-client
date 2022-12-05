import { Link } from 'react-router-dom'
import './list.css'
import './MoreFeatures.css'
import InitialsBox from '../../InitialsBox/InitialsBox'
import { useState } from 'react'
import MoreFeatures from './MoreFeatures'

export const StudentListItem = ({ student, user }) => {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false)
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
      {showMoreFeatures && (
        <MoreFeatures
          setShowMoreFeatures={setShowMoreFeatures}
          student={student}
        />
      )}
      {user.role === 'TEACHER' ? (
        <button
          className="btn-more-item"
          onClick={() => setShowMoreFeatures(true)}
        >
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      ) : null}
    </li>
  )
}
