import './NavigationRail.css'

function NavigationRail({ user }) {
  return (
    <nav className="navigation-rail">
      <ul className="nav-item-wrapper">
        <li className="nav-item">
          <div className="nav-item-circle">
            <span className="material-symbols-outlined">home</span>
          </div>
          <span className="nav-item-name">Home</span>
        </li>

        <li className="nav-item">
          <div className="nav-item-circle">
            <span className="material-symbols-outlined">person</span>
          </div>
          <span className="nav-item-name">Profile</span>
        </li>

        <li className="nav-item">
          <div className="nav-item-circle">
            <span className="material-symbols-outlined">workspaces</span>
          </div>
          <span className="nav-item-name">Cohort</span>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationRail
