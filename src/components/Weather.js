import { useState } from 'react';
import axios from 'axios';
import './Weather.css';

// Read the key once, outside the component.
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();

    const query = city.trim();
    if (!query) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    if (!API_KEY) {
      setError(
        'Missing API key. Add REACT_APP_WEATHER_API_KEY to your .env file (or to Vercel) and restart or redeploy.'
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        query
      )}&units=metric&appid=${API_KEY}`;

      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response) {
        if (err.response.status === 404) {
          setError(`City "${query}" was not found. Check the spelling and try again.`);
        } else if (err.response.status === 401) {
          setError('Invalid API key. New keys can take a couple of hours to activate.');
        } else if (err.response.status === 429) {
          setError('Too many requests. Please wait a moment and try again.');
        } else {
          setError('The weather service returned an error. Please try again later.');
        }
      } else if (err.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const iconUrl = weather
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : '';

  return (
    <section className="weather" aria-label="Weather search">
      <form className="weather-form" onSubmit={fetchWeather}>
        <label htmlFor="city" className="visually-hidden">
          City name
        </label>
        <input
          id="city"
          type="text"
          placeholder="Enter city name (e.g. Chennai)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && (
        <p className="weather-error" role="alert">
          {error}
        </p>
      )}

      {weather && (
        <article className="weather-card">
          <header className="weather-card-header">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <img src={iconUrl} alt={weather.weather[0].description} />
          </header>

          <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>
          <p className="weather-desc">{weather.weather[0].description}</p>

          <dl className="weather-details">
            <div>
              <dt>Feels like</dt>
              <dd>{Math.round(weather.main.feels_like)}°C</dd>
            </div>
            <div>
              <dt>Humidity</dt>
              <dd>{weather.main.humidity}%</dd>
            </div>
            <div>
              <dt>Wind</dt>
              <dd>{weather.wind.speed} m/s</dd>
            </div>
            <div>
              <dt>Pressure</dt>
              <dd>{weather.main.pressure} hPa</dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  );
}

export default Weather;