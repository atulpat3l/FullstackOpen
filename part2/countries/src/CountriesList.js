import React, { useState } from "react";
import Country from "./Country";

const CountriesList = ({ countries, search }) => {
  const [country, setCountry] = useState({});

  const result = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const showCountry = (item) => {
    console.log(item);
    setCountry(item);
  };

  return (
    <div>
      {country.name !== undefined && search.length !== 0 ? (
        <Country
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flag={country.flags.png}
        />
      ) : (
        <>
          {result.length > 10 && <p>Too many results</p>}
          {result.length === 1 && (
            <Country
              name={result[0].name.common}
              capital={result[0].capital[0]}
              area={result[0].area}
              languages={result[0].languages}
              flag={result[0].flags.png}
            />
          )}
          {result.length < 10 &&
            result.length !== 1 &&
            result.map((item, index) => (
              <p key={item.name.common + index}>
                {item.name.common}{" "}
                <button onClick={() => showCountry(item)}>show</button>
              </p>
            ))}
        </>
      )}
    </div>
  );
};

export default CountriesList;
