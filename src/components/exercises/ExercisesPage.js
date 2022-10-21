import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import client from '../../utils/client'
import './exercises.css'
import Header from '../Header/Header'
import SideNavBar from '../sideNavBar/sideNavBar'

const ExercisesPage = ({ userData }) => {
  const [exercisesList, setExercisesList] = useState([])
  useEffect(() => {
    client.get('/exercises').then((res) => {
      setExercisesList(res.data.data)
    })
  }, [])

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <div className="mainGridArea ">
        <SideNavBar />
        <ul className="exercises">
          {exercisesList.map((exercise) => {
            return (
              <li className="exercise">
                <span className="exercise-title">Title: </span>
                <span className="exercise-name">{exercise.exerciseName}</span>
                <span className="exercise-title">GitHub link: </span>
                <span className="exercise-name">
                  <a href={exercise.githubUrl}>Here</a>
                </span>
              </li>
            )
          })}
          {sessionStorage.getItem('userRole') === 'TEACHER' ? (
            <Link to="/exercises/add">
              <button>Create Exercise</button>
            </Link>
          ) : null}
        </ul>
      </div>
    </>
  )
}

export default ExercisesPage
