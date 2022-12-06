import './style.css'
import { useNavigate } from 'react-router-dom'
import InitialsBox from '../../InitialsBox/InitialsBox'

function TeacherListItem({ teacher }) {
  const fullName = teacher.firstName + ' ' + teacher.lastName
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/profile/${teacher.id}`)
  }

  const cohortId = teacher.cohortId

  return (
    <div className="teacher-item-panel" onClick={handleClick}>
      <div className="initials-box-wrapper-teacher">
        <InitialsBox
          firstWord={`${teacher.firstName}`}
          secondWord={`${teacher.lastName}`}
        />
      </div>
      <span className="teacher-name">{fullName}</span>
      <span className="teacher-cohort">
        {cohortId ? 'Cohort ' + cohortId : 'No Cohort'}
      </span>
    </div>
  )
}

export default TeacherListItem
