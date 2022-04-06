import React from "react";

const Filter = ({ persons, search, onChange }) => {
  const searchResult = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="search">
      filter shown with:{" "}
      <input type="text" value={search} onChange={onChange} />
      {search !== "" ? (
        <ul className="search-result">
          {searchResult.map((result) => (
            <li key={result.number}>
              {result.name} {result.number}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Filter;
