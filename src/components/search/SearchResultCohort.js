import './styles/SearchResult.css'
import { FaEllipsisH } from 'react-icons/fa'

function SearchResultCohort({ loggedInUser, cohort }) {
  return (
    <div className="search--result_item">
      <img src={cohort.profileUrl} alt="Cohort img" />
      <div className="search--result-item_name-role">
        <p>{cohort.cohortName}</p>
        <p>{`Start date: ${new Date(
          cohort.startDate
        ).toLocaleDateString()}`}</p>
      </div>
      <div className="search--result-item_buttons">
        <button className="button">Cohort page</button>
        <button className="button">Add students</button>
        <button className="button">Add note</button>
        <button className="button--more">
          <FaEllipsisH />
        </button>
      </div>
    </div>
  )
}

export default SearchResultCohort
