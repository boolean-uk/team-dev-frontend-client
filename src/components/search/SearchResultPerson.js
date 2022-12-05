import './styles/SearchResult.css'
import { FaEllipsisH } from 'react-icons/fa'

function SearchResultPerson({ loggedInUser, person }) {
  return (
    <div className="search--result_item">
      <img src={person.profileUrl} alt="Profile img" />
      <div className="search--result-item_name-role">
        <p>{person.firstName}</p>
        <p>{`${person.role} Cohort ${person.cohortId}`}</p>
      </div>
      <div className="search--result-item_buttons">
        <button className="button">Profile</button>
        {loggedInUser.role === 'TEACHER' && (
          <>
            <button className="button">Add to cohort</button>
            <button className="button">Add note</button>
          </>
        )}
        <button className="button--more">
          <FaEllipsisH />
        </button>
      </div>
    </div>
  )
}

export default SearchResultPerson
