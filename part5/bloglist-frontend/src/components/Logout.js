import React from "react";

const Logout = ({ user, logout }) => {
  return (
    <div className="logout">
      <p>{user.name}</p>
      <button className="btn--logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
