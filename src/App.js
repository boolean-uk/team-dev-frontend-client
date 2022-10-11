import "./App.css";
import { useState } from "react";
import LoginPage from "./components/users/login/LoginPage";
import RegistrationPage from "./components/users/registration/RegistrationPage";
import SettingsPage from "./components/users/settings/SettingsPage";
import PostsPage from "./components/posts/PostsPage";
import userBlankData from "./components/users/utils/userHelpers";
import AddCohortPage from "./components/cohort/AddCohortPage"

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(userBlankData());

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route
            path="/settings"
            element={
              <SettingsPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
           <Route path="/add-cohort" element={<AddCohortPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem("token");
  return !(loadedToken === "");
}

export default App;

const AuthenticateUser = ({ children, redirectPath = "/" }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
