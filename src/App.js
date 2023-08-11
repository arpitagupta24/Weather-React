import './App.css';
import { useEffect, useState } from 'react';
import { SplashScreen } from './SplashScreen';
import { WiCloud, WiDayCloudy, WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiWindy } from 'weather-icons-react';

function App() {
  const [splashScreen, setSplashScreen] = useState(true);
  const [city, setCity] = useState(null);
  const [showWeather, setShowWeather] = useState("disable");
  const [cityWeather, setCityWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState("metric"); // Default unit is Celsius

  const displaySplashScreen = () => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 1000);
  }

  useEffect(() => {
    displaySplashScreen();
  }, []);

  const apiKey = process.env.REACT_APP_apiKey;

  const fetchCurrentWeather = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Unable to fetch current weather data');
    }
  };

  const fetchForecast = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      return data.list;
    } else {
      throw new Error('Unable to fetch forecast data');
    }
  };

  const fetchData = async (cityName) => {
    try {
      const [currentWeatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName)
      ]);

      setCityWeather(currentWeatherData);
      setForecastData(forecastData.slice(0, 16)); // Get forecast for the next 4 days (4 days * 4 intervals/day = 16 intervals)
      setShowWeather('enable');
    } catch (error) {
      console.error(error);
      setCity(null);
      setShowWeather('disable');
      setCityWeather(null);
      setForecastData([]);
    }
  };

  const loadCity = async (event) => {
    const userInputVal = event.target.value;

    if (userInputVal) {
      fetchData(userInputVal);
    } else {
      setCity(null);
      setShowWeather("disable");
      setCityWeather(null);
      setForecastData([]);
    }
  };
  const toggleUnit = () => 
  {
  setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const renderWeatherDetails = () => {
    return (
      <div id="weatherDetails" className={showWeather}>
        <div id="mainWeatherDetails">
          <span className='weatherIcon'>
            {cityWeather.weather[0].description === "overcast clouds" ? (<WiCloud size={64} color='#555' />) :
              cityWeather.weather[0].description.includes("clouds") ? (<WiDayCloudy size={64} color='#555' />) :
              cityWeather.weather[0].description.includes("clear") ? (<WiDaySunny size={64} color='#555' />) :
              cityWeather.weather[0].description.includes("rain") ? (<WiRain size={64} color='#555' />) :
              cityWeather.weather[0].description.includes("snow") ? (<WiSnow size={64} color='#555' />) :
              cityWeather.weather[0].description.includes("thunderstorm") ? (<WiThunderstorm size={64} color='#555' />) :
              (<WiWindy size={64} color='#555' />)
            }
          </span>
          <p id="temperature">{cityWeather.main.temp}<sup>o</sup>{unit === "metric" ? "C" : "F"}</p>
          <p id="condition" style={{ textTransform: 'capitalize' }}>{cityWeather.weather[0].description}</p>
          <p id="location">🗺️ {cityWeather.name}</p>
          <p>Min Temp: {cityWeather.main.temp_min}<sup>o</sup>{unit === "metric" ? "C" : "F"}</p>
          <p>Max Temp: {cityWeather.main.temp_max}<sup>o</sup>{unit === "metric" ? "C" : "F"}</p>
          <p>Humidity: {cityWeather.main.humidity}%</p>
          <p>Wind Speed: {cityWeather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
          <p>Wind Direction: {cityWeather.wind.deg}°</p>
          <p>🌡️ {cityWeather.main.feels_like}<sup>o</sup>{unit === "metric" ? "C" : "F"}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {splashScreen ? <SplashScreen /> : ""}
      <div id="weatherMainContainer">
        <div id="userInputContainer">
          <h3 id="heading_of_app">Weather Forecast</h3><br /><br />
          <input type="text" id="userInputBox" onChange={loadCity} placeholder="Type city name..." /><br /><br />
        </div>
        {!city ? (
          <span></span>
        ) : (
          renderWeatherDetails()
        )}
        {cityWeather && renderWeatherDetails()}
        {forecastData.length > 0 && (
          <div id="forecastContainer">
            <h3 id="forecastHeading">4-Day Forecast</h3>
            <div className="forecastItems">
              {forecastData.map((forecastItem, index) => (
                <div key={index} className="forecastItem">
                  <p className="forecastDate">{forecastItem.dt_txt}</p>
                  <p className="forecastTemp">{forecastItem.main.temp}<sup>o</sup>{unit === "metric" ? "C" : "F"}</p>
                  <p className="forecastCondition">{forecastItem.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="unitToggle">
          <button onClick={toggleUnit}>Toggle Unit ({unit === "metric" ? "F" : "C"})</button>
        </div>
      </div>
    </>
  );
}

export default App;
