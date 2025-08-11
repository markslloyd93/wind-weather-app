import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WeatherDisplay } from '../../components/WeatherDisplay'
import type { WeatherData } from '../../hooks/useWeatherAPI'

const mockWeatherData: WeatherData = {
  windSpeed: 15,
  windDegree: 180,
  windGust: 20,
  temp: 25,
  location: 'London',
  coord: { lat: 51.5074, lon: -0.1278 },
}

describe('WeatherDisplay', () => {
  it('should render weather data correctly', () => {
    render(<WeatherDisplay weatherData={mockWeatherData} />)
    
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('25°C')).toBeInTheDocument()
    expect(screen.getByText('15 km/h')).toBeInTheDocument()
    expect(screen.getByText('20 km/h')).toBeInTheDocument()
  })

  it('should render all wind data items', () => {
    render(<WeatherDisplay weatherData={mockWeatherData} />)
    
    expect(screen.getByText('Speed')).toBeInTheDocument()
    expect(screen.getByText('Degree')).toBeInTheDocument()
    expect(screen.getByText('Gust')).toBeInTheDocument()
  })
})