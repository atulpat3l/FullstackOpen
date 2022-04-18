import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Person from "./Person";
import Notification from "./Notification";
import api from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("fetching all persons data");
    api.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      console.log("data recieved");
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const checkName = (obj) => obj.name === nameObject.name;
    if (persons.some(checkName)) {
      const personToUpdate = persons.filter(
        (person) => person.name === nameObject.name
      );
      const nameToUpdateId = personToUpdate[0].id;

      if (
        window.confirm(
          `${nameObject.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        api.update(nameToUpdateId, nameObject).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== nameToUpdateId ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
          setMessage(`Updated ${nameObject.name}`);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        });
      }
    } else {
      api.create(nameObject).then((returnedObject) => {
        setPersons(persons.concat(returnedObject));
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${nameObject.name}`);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      api.deletePerson(id, name);
      setPersons(persons.filter((person) => person.id !== id));
      setMessage(`deleted ${name}`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter persons={persons} search={search} onChange={handleSearchChange} />

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul className="flow">
        {persons.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleClick={() => deletePerson(person.id, person.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
