import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const total = parts.reduce((sum, number) => {
    return sum + number.exercises;
  }, 0);
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
      <p className="total">total of {total} exercises</p>
    </>
  );
};

export default Content;
