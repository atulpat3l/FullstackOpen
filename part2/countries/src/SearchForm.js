import React from "react";

const SearchForm = ({ search, handleChange }) => {
  return (
    <>
      <label htmlFor="search">find countries</label>
      <input type="text" id="search" value={search} onChange={handleChange} />
    </>
  );
};

export default SearchForm;
