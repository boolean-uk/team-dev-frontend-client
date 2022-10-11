import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SettingsForm from "./SettingsForm";
import userBlankData from "../utils/userHelpers";
import client from "../../../utils/client";
import "./style.css";

const SettingsPage = ({ currentUser, setCurrentUser }) => {
  console.log("currentUser on settings page");
  console.log(currentUser);
  const [user, setUser] = useState(currentUser);

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="settings-page">
      <Link id="user-settings-link" to="/signup">
        sign up
      </Link>{" "}
      <Link id="user-login-link" to="/">
        login
      </Link>
      <h1>Sign up</h1>
      <SettingsForm handleChange={handleChange} user={user} />
    </div>
  );
};

export default SettingsPage;
