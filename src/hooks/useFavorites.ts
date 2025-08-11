import { useState, useEffect, useCallback } from 'react';
import type { WeatherData } from './useWeatherAPI';

export interface FavoriteLocation {
  id: string;
  name: string;
  coord: { lat: number; lon: number };
  savedAt: string;
  temp?: number;
}

const STORAGE_KEY = 'weatherFavorites';

interface UseFavoritesReturn {
  favorites: FavoriteLocation[];
  addToFavorites: (weatherData: WeatherData) => boolean;
  removeFromFavorites: (id: string) => void;
  isFavorite: (location: string) => boolean;
}

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load favorites:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = useCallback((weatherData: WeatherData): boolean => {
    if (!weatherData.coord) return false;

    const existingFavorite = favorites.find(fav => fav.name === weatherData.location);
    if (existingFavorite) return false;

    const newFavorite: FavoriteLocation = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: weatherData.location,
      coord: weatherData.coord,
      savedAt: new Date().toISOString(),
      temp: weatherData.temp,
    };

    setFavorites(prev => [...prev, newFavorite]);
    return true;
  }, [favorites]);

  const removeFromFavorites = useCallback((id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  }, []);

  const isFavorite = useCallback((location: string): boolean => {
    return favorites.some(fav => fav.name === location);
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};