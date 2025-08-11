import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFavorites } from '../useFavorites'
import type { WeatherData } from '../useWeatherAPI'

const mockWeatherData: WeatherData = {
  windSpeed: 5,
  windDegree: 180,
  windGust: 8,
  temp: 20,
  location: 'London',
  coord: { lat: 51.5074, lon: -0.1278 },
}

describe('useFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites())
    
    expect(result.current.favorites).toEqual([])
  })

  it('should add location to favorites', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      const success = result.current.addToFavorites(mockWeatherData)
      expect(success).toBe(true)
    })

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.favorites[0].name).toBe('London')
    expect(result.current.isFavorite('London')).toBe(true)
  })

  it('should remove favorite by id', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addToFavorites(mockWeatherData)
    })

    const favoriteId = result.current.favorites[0].id

    act(() => {
      result.current.removeFromFavorites(favoriteId)
    })

    expect(result.current.favorites).toHaveLength(0)
    expect(result.current.isFavorite('London')).toBe(false)
  })

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addToFavorites(mockWeatherData)
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'weatherFavorites',
      expect.stringContaining('London')
    )
  })

  it('should handle localStorage errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(localStorage.setItem).mockImplementation(() => {
      throw new Error('Storage quota exceeded')
    })

    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addToFavorites(mockWeatherData)
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to save favorites:',
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })
})