import { useState, useEffect } from "react";
import SettingsForm from "./SettingsForm";
import Header from "../../Header/Header"
import client from "../../../utils/client";
import "./style.css";

const SettingsPage = ({ currentUser, setCurrentUser }) => {
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
    <>
    <Header companyName={`Cohort Manager 2.0`} />
    <div className="settings-page">
      <h1>User Settings</h1>
      <SettingsForm handleChange={handleChange} user={user} />
    </div>
    </>
  );
};

export default SettingsPage;
