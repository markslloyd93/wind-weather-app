import { useRef, FormEvent } from 'react';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const WeatherSearch = ({ onSearch, isLoading, disabled }: WeatherSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value.trim()) {
      onSearch(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="weatherSearch" className="sr-only">
        Search for weather by location
      </label>
      <input 
        ref={inputRef} 
        id="weatherSearch" 
        type="search" 
        placeholder="Search for a location" 
        aria-describedby="search-hint"
        disabled={isLoading || disabled}
      />
      <span id="search-hint" className="sr-only">
        Enter a city name or location to get weather information
      </span>
      <button 
        type="submit" 
        className="btn" 
        disabled={isLoading || disabled}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};