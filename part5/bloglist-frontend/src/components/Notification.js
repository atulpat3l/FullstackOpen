import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ errorMessage, sucessMessage }) => {
  const className = sucessMessage ? 'sucess' : 'error';
  if (errorMessage === null && sucessMessage === null) {
    return null;
  }
  return <div className={className}>{errorMessage || sucessMessage}</div>;
};

Notification.propTypes = {
  errorMessage: PropTypes.string,
  sucessMessage: PropTypes.string,
};

export default Notification;
