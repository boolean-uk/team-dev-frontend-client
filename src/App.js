import './App.css'
import LoginPage from './components/users/login/LoginPage'
import RegistrationPage from './components/users/registration/RegistrationPage'
import PostsPage from './components/posts/PostsPage'
import SettingsPage from './components/users/settings/SettingsPage'
import AddCohortPage from './components/cohort/AddCohortPage'
import ExercisesPage from './components/exercises/ExercisesPage'
import AddUserPage from './components/users/AddUsers/AddUsersPage'
import UsersPage from './components/users/UsersPage/UsersPage'
import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

function App() {
  const [userData, setUserData] = useState('')

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/posts" element={<PostsPage userData={userData} />} />
          <Route
            path="/settings"
            element={<SettingsPage userData={userData} />}
          />
          <Route
            path="/add-cohort"
            element={<AddCohortPage userData={userData} />}
          />
          <Route path="/users" element={<UsersPage userData={userData} />} />
          <Route
            path="/exercises"
            element={<ExercisesPage userData={userData} />}
          />
          <Route
            path="/add-user"
            element={<AddUserPage userData={userData} />}
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
