import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Weather from '../../Weather'

const mockWeatherResponse = {
  name: 'London',
  coord: { lat: 51.5074, lon: -0.1278 },
  main: { temp: 20, humidity: 65, pressure: 1013 },
  wind: { speed: 5, deg: 180, gust: 8 },
  weather: [{ icon: '01d', description: 'clear sky' }]
}

describe('Weather Component Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    
    // Mock successful API response
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockWeatherResponse,
    } as Response)
  })

  it('should render search functionality', () => {
    render(<Weather />)
    
    expect(screen.getByLabelText(/search for weather/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('should load default location on mount', async () => {
    render(<Weather />)
    
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument()
    })
  })


  it('should save and remove favorites', async () => {
    const user = userEvent.setup()
    render(<Weather />)
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument()
    })
    
    // Save to favorites
    await user.click(screen.getByRole('button', { name: /save to favorites/i }))
    
    // Check favorites count updated
    expect(screen.getByText(/favorites \(1\)/i)).toBeInTheDocument()
    
    // Go to favorites view
    await user.click(screen.getByRole('button', { name: /favorites/i }))
    
    // Check London is in favorites
    expect(screen.getByText('London')).toBeInTheDocument()
  })

  it('should handle API errors gracefully', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))
    
    const user = userEvent.setup()
    render(<Weather />)
    
    const input = screen.getByLabelText(/search for weather/i)
    await user.type(input, 'InvalidCity')
    await user.click(screen.getByRole('button', { name: /search/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    })
  })
})