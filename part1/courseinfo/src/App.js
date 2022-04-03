const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.part.map((part, index) => {
        return <Part key={index} name={part.name} exercises={part.exercises} />;
      })}
    </>
  );
};

const Total = (props) => {
  let totalExercises = props.values.reduce(
    (partialTotal, value) => partialTotal + value.exercises,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

function App() {
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const course = "Half Stack application development";
  return (
    <div>
      <Header course={course} />
      <Content part={parts} />
      <Total values={parts} />
    </div>
  );
}

export default App;
