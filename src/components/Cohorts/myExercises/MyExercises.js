import { useEffect, useState } from 'react'
import client from '../../../utils/client'
import './exercises.css'

function MyExercises({ User }) {
  const [myExercises, setMyExercises] = useState([])
  useEffect(() => {
    client
      .get(`/cohorts/${User.cohortId}/cohortExercises`)
      .then((res) => setMyExercises(res.data.data.cohortExercises))
      .catch((err) => console.log(err.response))
  }, [User.cohortId])

  return (
    <div className="exercises-list">
      <h1 className="exercises-title">My Exercises</h1>
      {myExercises.map((exercise, index) => {
        const exerciseUrl = exercise.cohortExercise.exercise.githubUrl
        const exercise_Name = exercise.cohortExercise.exercise.exerciseName
        return (
          <div key={index} className="exercises-list-item">
            {exercise_Name} : <a href={exerciseUrl}>{exerciseUrl}</a>
          </div>
        )
      })}
    </div>
  )
}

export default MyExercises
