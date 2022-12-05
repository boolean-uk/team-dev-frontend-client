import { useNavigate } from 'react-router-dom'
import './style.css'
function CohortListItem({ cohort }) {
  const navigate = useNavigate()
  return (
    <div
      className="cohort-item-panel"
      onClick={() => navigate(`/cohorts/${cohort.id}`)}
    >
      <img
        src={`https://avatars.dicebear.com/api/initials/:${cohort.cohortName}.svg`}
        alt="cohort initials"
      />
      <span className="cohort-name">{cohort.cohortName}</span>
      <span className="cohort-id">Cohort {cohort.id}</span>
    </div>
  )
}

export default CohortListItem
