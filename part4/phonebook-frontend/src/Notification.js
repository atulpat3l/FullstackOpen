const Notification = ({ message }) => {
  return (
    message !== null && (
      <div className="notification">
        {message.success && <p className="message">{message.success}</p>}
        {message.error && <p className="message error">{message.error}</p>}
      </div>
    )
  );
};

export default Notification;
