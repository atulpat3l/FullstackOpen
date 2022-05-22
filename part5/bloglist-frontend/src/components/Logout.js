import React from 'react';
import PropTypes from 'prop-types';

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

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Logout;
