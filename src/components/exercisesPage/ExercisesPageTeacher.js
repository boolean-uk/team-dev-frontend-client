import CohortsList from '../cohortsList/CohortsList'
import NavigationRail from '../NavigationRail/NavigationRail'
import Header from '../Header/Header'
import './exercises.css'

function ExercisePageSelect({ loggedInUser }) {
  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />

      <NavigationRail user={loggedInUser} />

      <main className="exercises-page-main">
        <h1>Select a cohort to see its Exercises</h1>
        <CohortsList
          renderHeader={false}
          renderAddButton={false}
          goToExercises={true}
        />
      </main>
    </>
  )
}

export default ExercisePageSelect
