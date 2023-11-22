import React, { useState } from "react";
import "./stylesheets/App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const url =
    "https://api.openweathermap.org/data/2.5/weather";
  //?q={city name}&appid={API key}
  const APIKEY = "323105b34130a48e243f559048930d20";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(city);

    if (city.length > 0) fetchWeather();
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${url}?q=${city}&appid=${APIKEY}`
      );
      const dataFetch = await response.json();
      setData(dataFetch);
    } catch (error) {
      console.error("An error occurred!!!", error);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCity}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {data && (
          <div>
            <h2>{data?.name}</h2>
            <p>
              Temperature:{" "}
              {parseInt(data?.main?.temp - 273.15)}{" "}
              °C
            </p>
            <p>
              Weather conditions:{" "}
              {data.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { App };
