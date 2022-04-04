import React from "react";

const Statistics = ({ data }) => {
  const total = data.good + data.neutral + data.bad;
  const average = (data.good - data.bad) / total;
  const positive = (data.good / total) * 100;
  return (
    <>
      <h2>statistics</h2>
      <div className="stats">
        <p>good: {data.good}</p>
        <p>neutral: {data.neutral}</p>
        <p>bad: {data.bad}</p>
      </div>
      <hr />
      <div className="other-data">
        <p>total: {total}</p>
        <p>average: {average}</p>
        <p>positive: {positive}%</p>
      </div>
    </>
  );
};

export default Statistics;
