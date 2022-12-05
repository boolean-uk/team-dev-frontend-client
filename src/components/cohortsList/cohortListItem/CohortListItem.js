import { useNavigate } from 'react-router-dom'
import InitialsBox from '../../InitialsBox/InitialsBox'
import './style.css'
function CohortListItem({ cohort, goToExercises = false }) {
  const navigate = useNavigate()
  const pathToNavigate = goToExercises
    ? `/exercises/${cohort.id}`
    : `/cohorts/${cohort.id}`

  return (
    <div className="cohort-item-panel" onClick={() => navigate(pathToNavigate)}>
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
