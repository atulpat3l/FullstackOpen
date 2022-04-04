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

        <table>
          <tbody>
            <tr>
              <StatisticLine text={"Good"} value={data.good} />
            </tr>
            <tr>
              <StatisticLine text={"Neutral"} value={data.neutral} />
            </tr>
            <tr>
              <StatisticLine text={"Bad"} value={data.bad} />
            </tr>
            <tr>
              <StatisticLine text={"All"} value={total} />
            </tr>
            <tr>
              <StatisticLine text={"Average"} value={average} />
            </tr>
            <tr>
              <StatisticLine text={"Positive"} value={positive + " %"} />
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

export default Statistics;
