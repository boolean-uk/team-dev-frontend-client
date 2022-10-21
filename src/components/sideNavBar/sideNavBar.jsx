import { Link } from 'react-router-dom'
import './navBar.css'

const SideNavBar = ({ userData }) => {
  return (
    <div className="sidebar">
      <div className="menuNav">
        <Link
          to="/users"
          style={{
            textDecoration: 'none',
            // fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <p>Cohort</p>
        </Link>
      </div>
      <div className="menuNav">
        <Link
          to="/posts"
          style={{
            textDecoration: 'none',
            // fontSize: '25px',
            fontWeight: 'bold'
          }}
        >
          <p>Posts</p>
        </Link>
      </div>
      <div className="menuNav">
        <Link
          to="/conversations"
          style={{
            textDecoration: 'none',
            // fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <p>Conversations</p>
        </Link>
        <Link
          to="/conversations"
          style={{ textDecoration: 'none', fontSize: '1 em', color: 'white' }}
        >
          <p>User 1</p>
        </Link>
        <Link
          to="/conversations"
          style={{ textDecoration: 'none', fontSize: '1 em', color: 'white' }}
        >
          <p>User 2</p>
        </Link>
        <Link
          to="/conversations"
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
            // fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <p>Cohort Exercises</p>
        </Link>
      </div>
      {userData.role === 'TEACHER' && (
        <>
          <div className="menuNav">
            <Link
              to="/notes"
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              <p>Teacher Notes</p>
            </Link>
          </div>
        </>
      )}
      <div className="menuNav">
        <Link
          to="/settings "
          style={{
            textDecoration: 'none',
            // fontSize: '25px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <p>User Settings</p>
        </Link>
      </div>
    </div>
  )
}

export default SideNavBar
