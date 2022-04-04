import "./App.css";
import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  // const stats = {
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  //   total: 0,
  //   average: 0,
  //   positive: 0,
  // };

  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    positive: 0,
  });
  const handleGood = () => {
    setStats({
      ...stats,
      good: stats.good + 1,
    });
  };
  const handleNeutral = () => {
    setStats({ ...stats, neutral: stats.neutral + 1 });
  };
  const handleBad = () => {
    setStats({ ...stats, bad: stats.bad + 1 });
  };

  return (
    <div className="container">
      <h1>give feedback</h1>
      <div className="feedback">
        <Button click={handleGood} text={"Good"} />
        <Button click={handleNeutral} text={"Neutral"} />
        <Button click={handleBad} text={"Bad"} />
      </div>
      <Statistics data={stats} />
    </div>
  );
};

export default App;
