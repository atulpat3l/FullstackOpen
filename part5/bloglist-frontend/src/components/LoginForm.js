import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const LoginForm = ({ loginUser, handleException }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem(
        "loggedBloglistAppUser",
        JSON.stringify(user)
      );
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleException("invalid username or password");
      setUsername("");
      setPassword("");
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === "username") {
      setUsername(target.value);
    } else if (target.name === "password") {
      setPassword(target.value);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={handleChange}
        value={username}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        value={password}
      />
      <button className="btn--login" type="submit">
        Login
      </button>
    </form>
  );
};

LoginForm.propType = {
  loginUser: PropTypes.func.isRequired,
  handleException: PropTypes.func.isRequired,
};

export default LoginForm;
