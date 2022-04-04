import "./App.css";
import { useState } from "react";
import Statistics from "./Statistics";

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
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <Statistics data={stats} />
    </div>
  );
};

export default App;
