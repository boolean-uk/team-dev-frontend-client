import './style.css'

function TeacherListItem({ user }) {
  return (
    <div className="teacher-item-panel">
      <img
        src={`https://avatars.dicebear.com/api/initials/:${user.firstName}.svg`}
        alt="teacher initials"
      ></img>
      <span>{user.firstName + ' ' + user.lastName}</span>
    </div>
  )
}

export default TeacherListItem
