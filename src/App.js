import './App.css'
import LoginPage from './components/users/login/LoginPage'
import RegistrationPage from './components/users/registration/RegistrationPage'
import PostsPage from './components/posts/PostsPage'
import ProfilePage from './components/profile/ProfilePage'
import ProfileEdit from './components/profile/ProfileEdit'
import SearchResults from './components/search/SearchResults'

import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CohortsPageTeachers from './components/Cohorts/CohortsPage/CohortsPageTeacher'
import { StudentsCohortPage } from './components/Cohorts/CohortsPage/StudentsPage'
import ExercisePageSelect from './components/exercisesPage/ExercisesPageTeacher'
import ExercisePage from './components/exercisesPage/ExercisePage'

function App() {
  // fetch logged in user from local storage
  const [loggedInUser, setLoggedInUser] = useState(null)
  console.log('Render App(); loggedInUser=', loggedInUser)

  // Replaced useEffect for loading loggedInUser to avoid delays in having this state
  if (loggedInUser === null) {
    const loggedInUserStr = localStorage.getItem('loggedInUser')
    if (loggedInUserStr) {
      // parse the string into a JS Object
      setLoggedInUser(JSON.parse(loggedInUserStr))
    }
  }

  return (
    <div className="App">
      <Helmet>
        <title>Cohort Manager 2.0</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={<LoginPage setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route
            path="/posts"
            element={<PostsPage loggedInUser={loggedInUser} />}
          />
        </Route>

        <Route
          element={<AuthenticateTeacherUser loggedInUser={loggedInUser} />}
        >
          <Route
            path="/cohorts"
            element={<CohortsPageTeachers loggedInUser={loggedInUser} />}
          />
          <Route
            path="/exercises"
            element={<ExercisePageSelect loggedInUser={loggedInUser} />}
          />
        </Route>
        <Route element={<AuthenticateUser />}>
          <Route
            path="/cohorts/:id"
            element={<StudentsCohortPage loggedInUser={loggedInUser} />}
          />
          <Route
            path="/exercises/:cohortId"
            element={<ExercisePage loggedInUser={loggedInUser} />}
          />
        </Route>
        <Route element={<AuthenticateUser />}>
          <Route
            path="/profile/:id"
            element={<ProfilePage loggedInUser={loggedInUser} />}
          />
        </Route>
        <Route element={<AuthenticateUser />}>
          <Route
            path="/profile/:id/edit"
            element={<ProfileEdit loggedInUser={loggedInUser} />}
          />
        </Route>
        <Route element={<AuthenticateUser />}>
          <Route
            path="/search"
            element={<SearchResults loggedInUser={loggedInUser} />}
          />
        </Route>
      </Routes>
    </div>
  )
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem('token')
  return !(loadedToken === '')
}

export default App

const AuthenticateUser = ({ children, redirectPath = '/' }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

const AuthenticateTeacherUser = ({
  children,
  loggedInUser,
  redirectPath = '/posts'
}) => {
  if (!isLoggedIn() || loggedInUser.role !== 'TEACHER') {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
