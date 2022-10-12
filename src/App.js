
import './App.css';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';


function App() {
  const [userData, setUserData] = useState('')

  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<LoginPage  setUserData={setUserData}/>} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path='/posts' element={<PostsPage userData={userData}/>} />

        </Route>
      </Routes>

      <Routes>
        <Route path="/" element={<LoginPage />} setUserData={setUserData} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/posts" element={<PostsPage userData={userData} />} />
          </Route>
          <Route path="/users" />
          {/* element={<UsersPage />} */}
          <Route path="/exercises" />
          {/* element={<ExercisePage />} */}
          <Route path="/settings" />
          {/* element={<SettingsPage />} */}
          <Route path="/add-user" />
          {/* element={<AddUserPage />} */}
          <Route path="/add-cohort" />
          {/* element={<AddCohortPage />} */}
        
      </Routes>

    </div>
  )
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem('token')
  return !(loadedToken === '')
}

export default App

const AuthenticateUser = ({ children, redirectPath = "/" }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
