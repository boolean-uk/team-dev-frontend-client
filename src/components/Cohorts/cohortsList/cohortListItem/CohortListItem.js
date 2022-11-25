import './style.css'

function CohortListItem({ cohort }) {
  return (
    <div className="cohort-item-panel">
      <p>CohortName: {cohort.cohortName}</p>
    </div>
  )
}

export default CohortListItem
