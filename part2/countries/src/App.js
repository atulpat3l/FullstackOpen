import React, { useEffect, useState } from "react";
import axios from "axios";
import CountriesList from "./CountriesList";
import SearchForm from "./SearchForm";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log("Fetching all Countries Data");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("All Contries Data recieved");
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <SearchForm handleChange={handleSearch} search={search} />
      <CountriesList countries={countries} search={search} />
    </>
  );
};

export default App;
