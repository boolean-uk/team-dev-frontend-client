import { useNavigate } from 'react-router-dom'
import InitialsBox from '../../InitialsBox/InitialsBox'
import './style.css'
function CohortListItem({ cohort }) {
  const navigate = useNavigate()
  return (
    <div
      className="cohort-item-panel"
      onClick={() => navigate(`/cohorts/${cohort.id}`)}
    >
      <div className="initials-box-wrapper-cohorts">
        <InitialsBox
          firstWord={`${cohort.cohortName}`}
          secondWord={`${cohort.id}`}
        />
      </div>
      <span className="cohort-name">{cohort.cohortName}</span>
      <span className="cohort-id">Cohort {cohort.id}</span>
    </div>
  )
}

export default CohortListItem
