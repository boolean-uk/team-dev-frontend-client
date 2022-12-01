import { useEffect, useState } from 'react'
import client from '../../../utils/client'
import './exercises.css'

function MyExercises({ user }) {
  const [myExercises, setMyExercises] = useState([])
  useEffect(() => {
    client
      .get(`/cohorts/${user.id}/cohortExercises`)
      .then((res) => setMyExercises(res.data.data.cohortExercises))
      .catch((err) => console.log(err.response))
  }, [user.id])

  return (
    <div className="exercises-list">
      <h1 className="exercises-title">My Exercises</h1>
      {myExercises.map((exercise) => {
        return (
          <div className="exercises-list-item">
            {exercise.cohortExercise.exercise.exerciseName} :{' '}
            <a href={exercise.cohortExercise.exercise.githubUrl}>
              {exercise.cohortExercise.exercise.githubUrl}
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default MyExercises
