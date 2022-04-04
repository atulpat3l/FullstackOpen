import React from "react";

const Button = ({ click, text }) => {
  return <button onClick={click}>{text}</button>;
};

export default Button;
