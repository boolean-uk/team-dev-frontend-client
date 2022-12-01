import { useEffect, useState } from 'react'
import client from '../../../utils/client'
import './exercises.css'

function MyExercises({ loggedInUser }) {
  const [myExercises, setMyExercises] = useState([])
  useEffect(() => {
    client
      .get(`/cohorts/${loggedInUser.id}/cohortExercises`)
      .then((res) => setMyExercises(res.data.data.cohortExercises))
      .catch((err) => console.log(err.response))
  }, [loggedInUser.id])
  console.log('myexercise:', myExercises)
  return (
    <div className="exercises-list">
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
