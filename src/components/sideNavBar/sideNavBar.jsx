import { Link } from 'react-router-dom'
import './navBar.css'

const SideNavBar = () => {
  return (
    <div className="sidebar">
      <div className="menuNav">
        <Link
          to="/posts"
          style={{
            textDecoration: 'none',
            fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <h2>Cohort</h2>
        </Link>
      </div>
      <div className="menuNav">
        <Link
          to="/posts"
          style={{
            textDecoration: 'none',
            fontSize: '25px',
            color: '#1976d2',
            fontWeight: 'bold'
          }}
        >
          <h2>Posts</h2>
        </Link>
      </div>
      <div className="menuNav">
        <Link
          to="/posts"
          style={{
            textDecoration: 'none',
            fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <h2>Conversations</h2>
        </Link>
        <Link
          to="/users"
          style={{ textDecoration: 'none', fontSize: '1 em', color: 'white' }}
        >
          <p>User 1</p>
        </Link>
        <Link
          to="/users"
          style={{ textDecoration: 'none', fontSize: '1 em', color: 'white' }}
        >
          <p>User 2</p>
        </Link>
        <Link
          to="/users"
          style={{ textDecoration: 'none', fontSize: '1 em', color: 'white' }}
        >
          <p>User 3</p>
        </Link>
        <button> + New Conversation</button>
      </div>
      <div className="menuNav">
        <Link
          to="/exercises"
          style={{
            textDecoration: 'none',
            fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <h2>Cohort Exercises</h2>
        </Link>
      </div>
      <div className="menuNav">
        <Link
          to=" /settings "
          style={{
            textDecoration: 'none',
            fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <h2>User Settings</h2>
        </Link>
      </div>
    </div>
  )
}

export default SideNavBar
