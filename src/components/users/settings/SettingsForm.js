import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const submitPlaceholder = (event) => {
  alert("API endpoint to update users has not yet been developed.");
};

const SettingsForm = ({ handleChange, user }) => {
  return (
    <form className="user-form" onSubmit={submitPlaceholder}>
      <TextField
        className="user-settings-form-input"
        label="First Name"
        variant="outlined"
        name="first_name"
        value={user.firstName}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        label="Last Name"
        variant="outlined"
        name="last_name"
        value={user.lastName}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        disabled
      />
      <TextField
        className="user-settings-form-input"
        label="Bio"
        variant="outlined"
        name="biography"
        value={user.biography}
        onChange={handleChange}
      />
      <TextField
        className="user-settings-form-input"
        type="url"
        label="GitHub URL"
        variant="outlined"
        name="github_url"
        value={user.github_url}
        onChange={handleChange}
      />
      <Button
        id="user-settings-submit-button"
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  );
};

export default SettingsForm;
