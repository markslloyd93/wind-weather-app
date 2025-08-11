import { useState, useCallback } from 'react';

export interface WeatherData {
  windSpeed: number;
  windDegree: number;
  windGust: number;
  temp: number;
  location: string;
  coord: { lat: number; lon: number };
}

interface UseWeatherAPIReturn {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  searchByCity: (city: string) => Promise<void>;
  searchByCoords: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}

export const useWeatherAPI = (): UseWeatherAPIReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (url: string): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key is missing. Please check your environment variables.');
    }

    const response = await fetch(`${url}&appid=${apiKey}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch weather data`);
    }

    const data = await response.json();
    
    return {
      windSpeed: data.wind?.speed || 0,
      windDegree: data.wind?.deg || 0,
      windGust: data.wind?.gust || 0,
      temp: Math.round(data.main.temp),
      location: data.name,
      coord: { lat: data.coord.lat, lon: data.coord.lon },
    };
  }, []);

  const searchByCity = useCallback(async (city: string) => {
    if (!city?.trim()) {
      setError('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&units=metric`;
      const data = await fetchWeatherData(url);
      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [fetchWeatherData]);

  const searchByCoords = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
      const data = await fetchWeatherData(url);
      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [fetchWeatherData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weatherData,
    isLoading,
    error,
    searchByCity,
    searchByCoords,
    clearError
  };
};