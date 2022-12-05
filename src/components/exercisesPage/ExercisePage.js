import { useParams } from 'react-router-dom'
import MyExercises from '../Cohorts/myExercises/MyExercises'
import NavigationRail from '../NavigationRail/NavigationRail'
import Header from '../Header/Header'

function ExercisePage({ loggedInUser }) {
  const urlParams = useParams()

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />

      <NavigationRail user={loggedInUser} />

      <main className="exercises-page-main">
        <h1>Exercises for Cohort {urlParams.id}</h1>
        <MyExercises User={loggedInUser} />
      </main>
    </>
  )
}

export default ExercisePage
