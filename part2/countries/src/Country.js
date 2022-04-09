import React from "react";

const Country = ({ name, capital, area, languages, flag }) => {
  const languageArray = Object.keys(languages);
  console.log("languages>>", languageArray);
  return (
    <div className="country">
      <h2>{name}</h2>
      <p className="capital">Capital: {capital}</p>
      <p className="area">Area: {area}</p>

      <h3>Languages:</h3>
      <ul className="languages">
        {languageArray.map((language, index) => (
          <li key={name + index}>{languages[language]}</li>
        ))}
      </ul>
      <img src={flag} alt={name + " flag"} />
    </div>
  );
};

export default Country;
