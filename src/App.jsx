import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/images/search.png';
import clear from './assets/images/clear.png';
import clouds from './assets/images/clouds.png';
import drizzle from './assets/images/drizzle.png';
import humidity from './assets/images/humidity.png';
import mist from './assets/images/mist.png';
import rain from './assets/images/rain.png';
import snow from './assets/images/snow.png';
import wind from './assets/images/wind.png';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null); 
  const [city, setCity] = useState("London");

  useEffect(() => {
    if (!city) return;

    const API_URL = "http://api.weatherapi.com/v1/current.json";
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // get the key from the weatherApi website
    const URL = `${API_URL}?key=${API_KEY}&q=${city}`;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrentWeather(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, [city]);

  const handleCityInput = () => {
    const cityInput = document.getElementById('city').value;
    setCity(cityInput);
  };

  function weatherType(condition) {
    switch (condition.toLowerCase()) {
      case "clear":
        return clear;
      case "mist":
        return mist;
      case "rain":
        return rain;
      case "snow":
        return snow;
      case "clouds":
        return clouds;
      case "drizzle":
        return drizzle;
      default:
        return clear;
    }
  }

  console.log("API Key:", import.meta.env.VITE_WEATHER_API_KEY);


  return (
    <main>
      <div className='searching-box'>
        <input type='text' id='city' placeholder='Type a city name' />
        <button onClick={handleCityInput}>
          <img src={search} alt="Search" />
        </button>
      </div>

      {currentWeather && currentWeather.current && currentWeather.location && (
        <>
          <div className='weather-info'>
            <img
              src={weatherType(currentWeather.current.condition.text)}
              alt="Weather icon"
            />
            <p className='temp'>{currentWeather.current.temp_c} °C</p>
            <p className='city'>{currentWeather.location.name}</p>
          </div>
          <div className='current-weather-info'>
            <div className='humidity'>
              <img src={humidity} alt="Humidity" />
              <p>{currentWeather.current.humidity}%</p>
              <p>humidity</p>
            </div>
            <div className='wind-speed'>
              <img src={wind} alt="Wind speed" />
              <p>{currentWeather.current.wind_kph} km/h</p>
              <p>wind speed</p>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default App;