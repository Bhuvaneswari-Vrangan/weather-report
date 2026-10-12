# Weather Report App

A responsive React app that shows real-time weather for any city, using axios and the OpenWeatherMap API.

## Setup

1. Get a free API key at https://openweathermap.org/api (sign up, then API keys). New keys can take up to a couple of hours to activate.
2. Install dependencies:
   ```
   npm install
   ```
3. Create your env file and paste in the key:
   ```
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   REACT_APP_WEATHER_API_KEY=your_key_here
   ```
4. Start the app:
   ```
   npm start
   ```
   Restart it after any change to `.env`.

## Structure

- `src/App.js`: semantic page layout (header, main, footer)
- `src/components/Weather.js`: all weather logic (useState, axios GET, error handling)
- `src/components/Weather.css`: flex/grid layout and media queries

## Error handling

Empty input, unknown city (404), invalid key (401), rate limit (429), other server errors, and network failures each show a clear message.
