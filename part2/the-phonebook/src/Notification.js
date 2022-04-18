const Notification = ({ message }) => {
  return (
    message !== "" && (
      <div className="notification">
        <p className="message">{message}</p>
      </div>
    )
  );
};

export default Notification;
