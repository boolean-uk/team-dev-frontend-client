import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import userBlankData from "../utils/userHelpers";
import client from "../../../utils/client";
import { useNavigate } from "react-router-dom";
import PostsPage from "../../posts/PostsPage";

const LoginPage = (props) => {
  const {setUserData} = props
  const [user, setUser] = useState(userBlankData());
  const [loginResponse, setLoginResponse] = useState({
    data: { token: "", user: {} },
  });

  let navigate = useNavigate();

  useEffect(() => {
    const loadedToken =
      localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || "";
    setLoginResponse({ data: { token: loadedToken } });
  }, []);


  const loginUser = (event) => {
    event.preventDefault();
    client
      .post("/login", user)
      .then((res) => {
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          res.data.data.token
        );
        setLoginResponse(res.data);
        navigate("../posts", { replace: true });
        setUserData(res.data.data.user)
        console.log("test user res data: ", res.data.data.user);


      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <div className="login-page">
      <div>
        <h1>Cohort Manager 2.0</h1>
      </div>
      <Link id="user-registration-link" to="/signup">
        sign up
      </Link>
      <Link id="user-login-link" to="/">
        login
      </Link>
      <h1>Login</h1>
      <p>Status: {loginResponse.status}</p>
      <UserForm handleChange={handleChange} handleSubmit={loginUser} />
      {/* <PostsPage userData={userData} /> */}
    </div>
  );
};

export default LoginPage;