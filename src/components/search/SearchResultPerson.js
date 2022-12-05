import './styles/SearchResult.css'
import { Link } from 'react-router-dom'

function SearchResultPerson({ loggedInUser, person }) {
  return (
    <div className="search--result_item">
      <img src={person.profileUrl} alt="Profile img" />
      <div className="search--result-item_name-role">
        <p>{person.firstName}</p>
        <p>{`${person.role} Cohort ${person.cohortId}`}</p>
      </div>
      <div className="search--result-item_buttons">
        <Link to={`/profile/${person.id}`} loggedInUser={loggedInUser}>
          <button className="button">Profile</button>
        </Link>
        {loggedInUser.role === 'TEACHER' && (
          <>
            <button className="button">Add to cohort</button>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResultPerson
