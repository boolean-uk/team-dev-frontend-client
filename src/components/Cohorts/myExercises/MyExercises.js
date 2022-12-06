import { useEffect, useState } from 'react'
import client from '../../../utils/client'
import './exercises.css'
import { useParams } from 'react-router-dom'

function MyExercises({ User }) {
  const [myExercises, setMyExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const urlParams = useParams()
  const cohortId = User.role === 'STUDENT' ? User.cohortId : urlParams.id
  useEffect(() => {
    client
      .get(`/cohorts/${cohortId}/cohortExercises`)
      .then((res) => {
        setLoading(false)
        console.log(res.data.data.cohortExercises)
        setMyExercises(res.data.data.cohortExercises)
      })
      .catch((err) => console.error(err.response))
  }, [User.cohortId, cohortId])

  return (
    <div className="exercises-list">
      <h1 className="exercises-title">Exercises</h1>
      {loading && <span>Loading Exercises...</span>}

      {myExercises.length !== 0 ? (
        myExercises.map((exercise, index) => {
          const exerciseUrl = exercise.cohortExercise.exercise.githubUrl
          const exercise_Name = exercise.cohortExercise.exercise.exerciseName
          return (
            <div key={index} className="exercises-list-item">
              {exercise_Name} :
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
        })
      ) : (
        <span>No Exercises - 🧙‍♂️</span>
      )}
    </div>
  )
}

export default MyExercises
