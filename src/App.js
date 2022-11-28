import './App.css'
import LoginPage from './components/users/login/LoginPage'
import RegistrationPage from './components/users/registration/RegistrationPage'
import PostsPage from './components/posts/PostsPage'
import ProfilePage from './components/profile/ProfilePage'

import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import TestTeachersCohort from './components/TestTeachersCohort'

function App() {
  // fetch logged in user from local storage
  const [loggedInUser, setLoggedInUser] = useState(null)
  console.log('Render App(); loggedInUser=', loggedInUser)

  useEffect(() => {
    // fetch the logged in user data from local storage
    // as a string, if available
    const loggedInUserStr = localStorage.getItem('loggedInUser')
    if (loggedInUserStr) {
      // parse the string into a JS Object
      setLoggedInUser(JSON.parse(loggedInUserStr))
    }
  }, [])

  return (
    <div className="App">
      <Helmet>
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
        <Route element={<AuthenticateUser />}>
          <Route
            path="/profile/:id"
            element={<ProfilePage loggedInUser={loggedInUser} />}
          />
        </Route>
        <Route path="/cohorts" element={<TestTeachersCohort />}></Route>
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
