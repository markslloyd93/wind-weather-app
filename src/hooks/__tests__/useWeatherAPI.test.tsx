import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useWeatherAPI } from '../useWeatherAPI'

const mockWeatherResponse = {
  name: 'London',
  coord: { lat: 51.5074, lon: -0.1278 },
  main: { temp: 20},
  wind: { speed: 5, deg: 180, gust: 8 },
}

describe('useWeatherAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useWeatherAPI())
    
    expect(result.current.weatherData).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should fetch weather data by city successfully', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    } as Response)

    const { result } = renderHook(() => useWeatherAPI())

    await result.current.searchByCity('London')

    await waitFor(() => {
      expect(result.current.weatherData).toEqual({
        windSpeed: 5,
        windDegree: 180,
        windGust: 8,
        temp: 20,
        location: 'London',
        coord: { lat: 51.5074, lon: -0.1278 },
      })
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should handle API errors correctly', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'City not found' }),
    } as Response)

    const { result } = renderHook(() => useWeatherAPI())

    await result.current.searchByCity('InvalidCity')

    await waitFor(() => {
      expect(result.current.error).toBe('City not found')
      expect(result.current.weatherData).toBeNull()
    })
  })

  it('should handle network errors', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useWeatherAPI())

    await result.current.searchByCity('London')

    await waitFor(() => {
      expect(result.current.error).toBe('Network error')
    })
  })

  it('should search by coordinates', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    } as Response)

    const { result } = renderHook(() => useWeatherAPI())

    await result.current.searchByCoords(51.5074, -0.1278)

    await waitFor(() => {
      expect(result.current.weatherData?.location).toBe('London')
    })

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('lat=51.5074&lon=-0.1278')
    )
  })
})