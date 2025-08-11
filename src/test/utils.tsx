import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

// Custom render function for components that need providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock weather data factory
export const createMockWeatherData = (overrides = {}) => ({
  windSpeed: 5,
  windDegree: 180,
  windGust: 8,
  temp: 20,
  location: 'Test City',
  coord: { lat: 0, lon: 0 },
  ...overrides
})

// Mock favorite location factory  
export const createMockFavorite = (overrides = {}) => ({
  id: '1',
  name: 'Test City',
  coord: { lat: 0, lon: 0 },
  savedAt: new Date().toISOString(),
  temp: 20,
  ...overrides
})