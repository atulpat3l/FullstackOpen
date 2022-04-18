import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ name, capital, area, languages, flag }) => {
  const [weather, setWeather] = useState();

  const languageArray = Object.keys(languages);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log(`Fetching Weather Data for ${capital},${name}`);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
      )
      .then((response) => {
        console.log("Weather Data recieved");
        setWeather(response.data);
      });
  }, [apiKey, capital]);

  const weatherIcon =
    weather !== undefined
      ? weather !== undefined &&
        "http://openweathermap.org/img/wn/" +
          weather.weather[0].icon +
          "@2x.png"
      : "";

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

      <div className="weather">
        <p>
          Tempreture:{" "}
          {weather !== undefined && (weather.main.temp - 273.15).toFixed(2)}{" "}
          Celcius
        </p>

        <img src={weatherIcon} alt="weather-icon" className="weather-icon" />
        <p className="wind">
          wind {weather !== undefined && weather.wind.speed} m/s
        </p>
      </div>
    </div>
  );
};

export default Country;
