import "./App.css";

import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div className="container">
      <h1>give feedback</h1>
      <div className="feedback">
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <h2>statistics</h2>
      <div className="stats">
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
      </div>
    </div>
  );
};

export default App;
