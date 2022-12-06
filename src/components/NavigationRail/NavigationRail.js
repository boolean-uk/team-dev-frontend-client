import { useNavigate } from 'react-router-dom'
import './NavigationRail.css'

function NavigationRail({ user }) {
  const navigate = useNavigate()

  function homePressed() {
    navigate(`/posts`)
  }
  function profilePressed() {
    navigate(`/profile/${user.id}`)
  }
  function cohortPressed() {
    if (user.role === 'TEACHER') {
      navigate('/cohorts')
    } else {
      navigate(`/cohorts/${user.cohortId}`)
    }
  }
  function exercisesPressed() {
    if (user.role === 'TEACHER') {
      navigate('/exercises')
    } else {
      if (user.cohortId !== null) {
        navigate(`/exercises/${user.cohortId}`)
      }
    }
  }

  return (
    <nav className="navigation-rail">
      <ul className="nav-item-wrapper">
        {/* Home */}
        <li className="nav-item noselect" onClick={homePressed}>
          <div className="nav-item-circle">
            <span className="material-symbols-outlined">home</span>
          </div>
          <span className="nav-item-name">Home</span>
        </li>

        {/* Profile */}
        <li className="nav-item noselect" onClick={profilePressed}>
          <div className="nav-item-circle">
            <span className="material-symbols-outlined">person</span>
          </div>
          <span className="nav-item-name">Profile</span>
        </li>

        {/* Cohort */}
        <li className="nav-item noselect" onClick={cohortPressed}>
          <div className="nav-item-circle">
            <span className="material-symbols-outlined">workspaces</span>
          </div>
          <span className="nav-item-name">Cohort</span>
        </li>

        {/* Exercises */}
        <li className="nav-item noselect" onClick={exercisesPressed}>
          <div className="nav-item-circle">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <span className="nav-item-name">Exercises</span>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationRail
