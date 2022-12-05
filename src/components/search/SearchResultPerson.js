import './styles/SearchResult.css'
import { FaEllipsisH } from 'react-icons/fa'
import client from '../../utils/client'
import { useNavigate } from 'react-router-dom'

function SearchResultPerson({ loggedInUser, person, cohorts }) {
  const navigate = useNavigate()

  const handleChange = (e) => {
    const cohort = parseInt(e.target.value)

    client
      .patch(`/users/update/${person.id}`, { ...person, cohortId: cohort })
      .then((data) => navigate(`/profile/${person.id}`))
  }

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
            {cohorts && (
              <>
                <select
                  className="search--result_dropdown"
                  name="cohortId"
                  onChange={handleChange}
                >
                  <option>Change Cohort...</option>
                  {cohorts.map((cohort) => {
                    const { id, cohortName } = cohort
                    return (
                      <option key={id} value={id}>
                        {cohortName}
                      </option>
                    )
                  })}
                </select>
              </>
            )}
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
