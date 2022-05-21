import React from "react";

const LoginForm = ({ onSubmit, onChange, username, password }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={onChange}
        value={username}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={onChange}
        value={password}
      />
      <button className="btn--login" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
