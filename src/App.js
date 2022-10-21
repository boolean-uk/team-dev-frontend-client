import './App.css'
import LoginPage from './components/users/login/LoginPage'
import RegistrationPage from './components/users/registration/RegistrationPage'
import PostsPage from './components/posts/PostsPage'
import SettingsPage from './components/users/settings/SettingsPage'
import AddCohortPage from './components/cohort/AddCohortPage'
import UsersPage from './components/users/UsersPage/UsersPage'
import AddNote from './components/notes/AddNote'
import NotesPage from './components/notes/NotesPage'
import AddUserPage from './components/users/AddUsers/AddUserPage'
import ExercisePage from './components/exercises/ExercisesPage'
import ExrciseForm from './components/exercises/ExerciseForm'
import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import SideNavBar from './components/sideNavBar/sideNavBar'
import ConversionPage from './components/Conversations/ConversationsPage'

function App() {
  const [userData, setUserData] = useState('')

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage setUserData={setUserData} />} />
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
          <Route path="/add-note" element={<AddNote userData={userData} />} />
          <Route path="/notes" element={<NotesPage userData={userData} />} />
          <Route path="/users" element={<UsersPage userData={userData} />} />
          <Route
            path="/exercises"
            element={<ExercisePage userData={userData} />}
          />
          <Route
            path="/exercises/add"
            element={<ExrciseForm userData={userData} />}
          />
          <Route
            path="/add-user"
            element={<AddUserPage userData={userData} />}
          />
          <Route
            path="/conversations"
            element={<ConversionPage userData={userData} />}
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
