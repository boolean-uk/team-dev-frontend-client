import './style.css'

function CohortListItem({ cohort }) {
  return (
    <div className="cohort-item-panel">
      <img
        src={`https://avatars.dicebear.com/api/initials/:${cohort.cohortName}.svg`}
        alt="cohort initials"
      />
      <p className="cohort-name">{cohort.cohortName}</p>
      <p className="cohort-id">Cohort {cohort.id}</p>
    </div>
  )
}

export default CohortListItem
