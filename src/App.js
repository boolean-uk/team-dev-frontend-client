import './App.css'
import LoginPage from './components/users/login/LoginPage'
import RegistrationPage from './components/users/registration/RegistrationPage'
import PostsPage from './components/posts/PostsPage'
import ProfilePage from './components/profile/ProfilePage'
import CohortPage from './components/Cohorts/StudentList/CohortPage'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

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
      <Routes>
        <Route
          path="/"
          element={<LoginPage setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/posts" element={<PostsPage />} />
        </Route>
        <Route element={<AuthenticateUser />}>
          <Route path="/profile/:id" element={<ProfilePage />} />
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
