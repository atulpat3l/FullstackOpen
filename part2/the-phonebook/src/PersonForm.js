import React from "react";

const PersonForm = ({
  addName,
  handleNameChange,
  handleNumberChange,
  newNumber,
  newName,
}) => {
  return (
    <>
      <h2>Add New</h2>
      <form className="flow" onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
