import { useEffect, useState } from 'react'
import client from '../../../utils/client'
import './exercises.css'
import { useParams } from 'react-router-dom'

function MyExercises({ User }) {
  const [myExercises, setMyExercises] = useState([])
  const urlParams = useParams()
  const cohortId = User.role === 'STUDENT' ? User.cohortId : urlParams.id
  useEffect(() => {
    client
      .get(`/cohorts/${cohortId}/cohortExercises`)
      .then((res) => setMyExercises(res.data.data.cohortExercises))
      .catch((err) => console.log(err.response))
  }, [User.cohortId, cohortId])

  return (
    <div className="exercises-list">
      <h1 className="exercises-title">My Exercises</h1>
      {myExercises.map((exercise, index) => {
        const exerciseUrl = exercise.cohortExercise.exercise.githubUrl
        const exercise_Name = exercise.cohortExercise.exercise.exerciseName
        return (
          <div key={index} className="exercises-list-item">
            {exercise_Name} :{' '}
            <a
              className="exercise-link"
              href={exerciseUrl}
              target="_blank"
              rel="noreferrer"
            >
              {exerciseUrl}
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default MyExercises
