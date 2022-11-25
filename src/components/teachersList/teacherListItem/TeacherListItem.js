import './style.css'
import { useNavigate } from 'react-router-dom'

function TeacherListItem({ teacher }) {
  const fullName = teacher.firstName + ' ' + teacher.lastName
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/profile/${teacher.id}`)
  }

  const cohortId = teacher.cohortId

  return (
    <div className="teacher-item-panel" onClick={handleClick}>
      <img
        src={`https://avatars.dicebear.com/api/initials/:${fullName}.svg`}
        alt="teacher initials"
      />
      <span className="teacher-name">{fullName}</span>
      <span className="teacher-cohort">
        {cohortId ? 'Cohort ' + cohortId : 'No Cohort'}
      </span>
    </div>
  )
}

export default TeacherListItem
