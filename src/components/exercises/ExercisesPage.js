import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import client from '../../utils/client'
import './exercises.css'
import ExrciseForm from './ExerciseForm'
import Header from '../Header/Header'
import SideNavBar from '../sideNavBar/sideNavBar'

const ExercisesPage = ({ userData }) => {
  const [exercisesList, setExercisesList] = useState([])
  useEffect(() => {
    client.get('/exercises').then((res) => {
      console.log('res: ', res.data.data)
      setExercisesList(res.data.data)
    })
  }, [])

  return (
    <>
      {(userData.role === 'TEACHER') === userData.id ? (
        <Link to="/exercises/add">
          <button>Create Exercise</button>
        </Link>
      ) : (
        userData
      )}
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <div className="mainGridArea ">
        <SideNavBar />
        <ul className="exercises">
          {exercisesList.map((exercise) => {
            console.log(exercisesList)
            return (
              <li className="exercise">
                <p>
                  <span className="exercise-title">Title: </span>
                  <span className="exercise-name">{exercise.exerciseName}</span>
                </p>
                <p>
                  <span className="exercise-title">GitHub link: </span>
                  <span className="exercise-name">
                    <a href={exercise.githubUrl}>Here</a>
                  </span>
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default ExercisesPage
