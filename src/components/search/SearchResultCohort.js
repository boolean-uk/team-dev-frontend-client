import './styles/SearchResult.css'
import { Link } from 'react-router-dom'
import InitialsBox from '../InitialsBox/InitialsBox'

function SearchResultCohort({ loggedInUser, cohort }) {
  return (
    <div className="search--result_item">
      <div className="comment-profile-img">
        <InitialsBox
          firstWord={'Cohort'}
          secondWord={cohort.id.toString()}
          bgColor={null}
        />
      </div>
      <div className="search--result-item_name-role">
        <p>{cohort.cohortName}</p>
        <p>{`Start date: ${new Date(
          cohort.startDate
        ).toLocaleDateString()}`}</p>
      </div>
      <div className="search--result-item_buttons">
        <Link to={`/cohorts/${cohort.id}`} loggedInUser={loggedInUser}>
          <button className="button">Cohort page</button>
        </Link>
        <button className="button">Add students</button>
      </div>
    </div>
  )
}

export default SearchResultCohort
