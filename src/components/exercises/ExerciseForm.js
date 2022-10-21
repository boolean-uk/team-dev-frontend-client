import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import SideNavBar from '../sideNavBar/sideNavBar'

import client from '../../utils/client'

const ExrciseForm = ({ userData }) => {
  const [exercise, setExercise] = useState({ exerciseName: '', githubUrl: '' })
  const navigate = useNavigate()

  const newExercise = (e) => {
    e.preventDefault()
    client
      .post(
        '/exercises',
        {
          exerciseName: exercise.exerciseName,
          githubUrl: exercise.githubUrl
        },
        true
      )
      .then((res) => {
        navigate('/exercises')
      })
  }

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <div className="mainGridArea ">
        <SideNavBar />
        <form onSubmit={(e) => newExercise(e)}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            onChange={(e) =>
              setExercise({ ...exercise, exerciseName: e.target.value })
            }
          />
          <label htmlFor="url">Link: </label>
          <input
            type="text"
            name="url"
            onChange={(e) =>
              setExercise({ ...exercise, githubUrl: e.target.value })
            }
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  )
}

export default ExrciseForm
