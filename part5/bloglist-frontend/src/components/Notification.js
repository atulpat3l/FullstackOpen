import React from 'react';

const Notification = ({ errorMessage, sucessMessage }) => {
  const className = sucessMessage ? 'sucess' : 'error';
  if (errorMessage === null && sucessMessage === null) {
    return null;
  }
  return <div className={className}>{errorMessage || sucessMessage}</div>;
};

export default Notification;
