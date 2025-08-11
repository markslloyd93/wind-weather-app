import { useEffect, useState, useCallback } from 'react';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { useWeatherAPI } from './hooks/useWeatherAPI';
import { WeatherSearch } from './components/WeatherSearch';
import { WeatherDisplay } from './components/WeatherDisplay';
import { useFavorites } from './hooks/useFavorites';
import { FavoritesList } from './components/FavoritesList';
import { ErrorMessage } from './components/ErrorMessage';
import { ErrorBoundary } from './components/ErrorBoundary';
import './Weather.css';

type ViewMode = 'weather' | 'favorites';

function Weather() {
  const { 
    weatherData, 
    isLoading, 
    error, 
    searchByCity, 
    searchByCoords, 
    clearError
  } = useWeatherAPI();

  const { 
    favorites, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  } = useFavorites();

  const [currentView, setCurrentView] = useState<ViewMode>('weather');

  // Load default location on mount
  useEffect(() => {
    searchByCity("Newcastle Upon Tyne");
  }, [searchByCity]);

  const handleSaveToFavorites = useCallback(() => {
    if (!weatherData) return;
    
    const success = addToFavorites(weatherData);
    if (!success) {
      // Could show a toast notification here instead
      alert("Location already in favorites!");
    }
  }, [weatherData, addToFavorites]);

  const handleLoadFavorite = useCallback((favorite: FavoriteLocation) => {
    searchByCoords(favorite.coord.lat, favorite.coord.lon);
    setCurrentView('weather');
  }, [searchByCoords]);

  const isCurrentLocationFavorite = weatherData ? isFavorite(weatherData.location) : false;

  if (currentView === 'favorites') {
    return (
      <ErrorBoundary>
        <section className="weather">
          <div className="container container--large">
            <header className="favorites-header">
              <button 
                onClick={() => setCurrentView('weather')}
                className="btn btn--back"
                aria-label="Back to weather"
              >
                <ArrowLeft size={20} />
                Back to Weather
              </button>
              
              <h1 className="favorites-title">
                Favorite Locations
              </h1>
            </header>

            <FavoritesList 
              favorites={favorites}
              onLoadFavorite={handleLoadFavorite}
              onRemoveFavorite={removeFromFavorites}
            />
          </div>
        </section>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <section className="weather">
        <div className="container container--large">
          <WeatherSearch 
            onSearch={searchByCity}
            isLoading={isLoading}
          />

          <nav className="weather-navigation">
            <button 
              className="btn"
              onClick={() => setCurrentView('favorites')}
            >
              <Star size={16} />
              Favorites ({favorites.length})
            </button>
            
            <button 
              className={`btn ${isCurrentLocationFavorite ? 'btn--favorited' : 'btn--save'}`}
              onClick={handleSaveToFavorites}
              disabled={!weatherData || isCurrentLocationFavorite}
              title={isCurrentLocationFavorite ? 'Already in favorites' : 'Save to favorites'}
            > 
              <Heart size={18} />
              {isCurrentLocationFavorite ? 'Saved' : 'Save To Favorites'}
            </button>
          </nav>

          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={clearError}
            />
          )}
          
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
    </ErrorBoundary>
  );
}

export default Weather;