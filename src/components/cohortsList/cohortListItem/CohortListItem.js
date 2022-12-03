import './style.css'
import InitialsBox from '../../InitialsBox/InitialsBox'
function CohortListItem({ cohort }) {
  console.log(cohort)
  return (
    <div className="cohort-item-panel">
      <img
        src={`https://avatars.dicebear.com/api/initials/:${cohort.cohortName}.svg`}
        alt="cohort initials"
      />
      <InitialsBox firstWord={cohort.cohortName} />
      <span className="cohort-name">{cohort.cohortName}</span>
      <span className="cohort-id">Cohort {cohort.id}</span>
    </div>
  )
}

export default CohortListItem
