import { useEffect, useState, useCallback } from 'react';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { useWeatherAPI } from './hooks/useWeatherAPI';
import { WeatherSearch } from './components/WeatherSearch';
import { WeatherDisplay } from './components/WeatherDisplay';
import './Weather.css';

function Weather() {
  const { 
    weatherData, 
    isLoading, 
    searchByCity, 
  } = useWeatherAPI();

  // Load default location on mount
  useEffect(() => {
    searchByCity("Newcastle Upon Tyne");
  }, [searchByCity]);

  return (
      <section className="weather">
        <div className="container container--large">
          <WeatherSearch 
            onSearch={searchByCity}
            isLoading={isLoading}
          />
          
          {isLoading ? (
            <section className="weather-placeholder" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Loading weather data...</p>
            </section>
          ) : weatherData ? (
            <WeatherDisplay weatherData={weatherData} />
          ) : (
            <section className="weather-placeholder">
              <p>Search for a location to view weather information</p>
            </section>
          )}
        </div>
      </section>
  );
}

export default Weather;