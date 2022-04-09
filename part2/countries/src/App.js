import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log("Fetching Data");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("Data recieved");
      setCountries(response.data);
    });
  }, []);

  const result = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  return (
    <>
      <form>
        <label htmlFor="search">find countries</label>
        <input type="text" id="search" value={search} onChange={handleSearch} />
      </form>
      <div>
        {result.length > 10 ? (
          <p>Too many results</p>
        ) : result.length === 1 ? (
          <Country
            name={result[0].name.common}
            capital={result[0].capital[0]}
            area={result[0].area}
            languages={result[0].languages}
            flag={result[0].flags.png}
          />
        ) : (
          result.map((item, index) => (
            <p key={item.name.common + index}>{item.name.common}</p>
          ))
        )}
      </div>
    </>
  );
};

export default App;
