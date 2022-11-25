import './style.css'
import { useNavigate } from 'react-router-dom'

function TeacherListItem({ teacher }) {
  const fullName = teacher.firstName + ' ' + teacher.lastName
  const navigate = useNavigate()

  function handleClick() {
    console.log('clicked')
    navigate(`/users/${teacher.id}`)
  }

  return (
    <div className="teacher-item-panel" onClick={handleClick}>
      <img
        src={`https://avatars.dicebear.com/api/initials/:${fullName}.svg`}
        alt="teacher initials"
      ></img>
      <span>{fullName}</span>
    </div>
  )
}

export default TeacherListItem
