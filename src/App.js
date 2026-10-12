import './App.css';
import Weather from './components/Weather';


function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Report</h1>
        <p>Search real-time weather for any city in the world.</p>
      </header>

      <main className="app-main">
        <Weather />
      </main>

      <footer className="app-footer">
        <small>
          Data from{' '}
          <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">
            OpenWeatherMap
          </a>
        </small>
      </footer>
    </div>
  );
}


export default App;

