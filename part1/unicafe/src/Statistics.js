import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ data }) => {
  const total = data.good + data.neutral + data.bad;
  const average = (data.good - data.bad) / total;
  const positive = (data.good / total) * 100;

  if (total > 0) {
    return (
      <>
        <h2>statistics</h2>
        <StatisticLine text={"Good"} value={data.good} />
        <StatisticLine text={"Neutral"} value={data.neutral} />
        <StatisticLine text={"Bad"} value={data.bad} />
        <hr />
        <StatisticLine text={"All"} value={total} />
        <StatisticLine text={"Average"} value={average} />
        <StatisticLine text={"Positive"} value={positive + " %"} />
      </>
    );
  }
};

export default Statistics;
