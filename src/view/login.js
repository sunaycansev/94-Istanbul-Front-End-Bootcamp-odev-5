import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Icon } from "../component/icon";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loginFormInputs, setLoginFormInputs] = useState({
    username: "",
    password: "",
  });
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    fetch("../public/userData.json")
      .then((res) => res.json())
      .then((data) => setUserLists(data))
      .catch((error) => console.log(error));
  }, []);
  const handleLoginInputChange = (e) => {
    setLoginFormInputs({
      ...loginFormInputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const currentUser = { ...loginFormInputs };
    let userDatas = [...userLists];

    const isUsersMatch = userDatas.some(
      (user) =>
        user.username === currentUser.username &&
        user.password === currentUser.password
    );

    if (!isUsersMatch) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem(
        "user",
        JSON.stringify(
          userLists.find((user) => user.username === currentUser.username)
        )
      );
    } else {
      alert("kullanici adi veya sifre hatalı");
    }
  };

  return isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div className="login-wrapper">
      <form className="login-form" action="" onSubmit={handleLoginFormSubmit}>
        <div className="login-icon-wrapper">
          <Icon size={50} iconName="twitter" color="#1DA1F2" />
        </div>
        <div>
          <input
            value={loginFormInputs.username}
            onChange={handleLoginInputChange}
            className="user-name-input"
            type="text"
            placeholder="username"
            name="username"
          />
        </div>
        <div>
          <input
            className="password-input"
            type="password"
            placeholder="password"
            name="password"
            value={loginFormInputs.password}
            onChange={handleLoginInputChange}
          />
        </div>
        <button className="login-submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
