import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FavoritesList } from '../../components/FavoritesList'
import type { FavoriteLocation } from '../../hooks/useFavorites'

const mockFavorites: FavoriteLocation[] = [
  {
    id: '1',
    name: 'London',
    coord: { lat: 51.5074, lon: -0.1278 },
    savedAt: '2024-01-01T12:00:00.000Z',
    temp: 20,
  },
  {
    id: '2',
    name: 'Paris',
    coord: { lat: 48.8566, lon: 2.3522 },
    savedAt: '2024-01-02T12:00:00.000Z',
    temp: 18
  }
]

describe('FavoritesList', () => {
  const mockOnLoadFavorite = vi.fn()
  const mockOnRemoveFavorite = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render empty state when no favorites', () => {
    render(
      <FavoritesList 
        favorites={[]} 
        onLoadFavorite={mockOnLoadFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    )
    
    expect(screen.getByText('No favorite locations saved yet')).toBeInTheDocument()
  })

  it('should render list of favorites', () => {
    render(
      <FavoritesList 
        favorites={mockFavorites} 
        onLoadFavorite={mockOnLoadFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    )
    
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('20°C')).toBeInTheDocument()
    expect(screen.getByText('18°C')).toBeInTheDocument()
  })

  it('should call onLoadFavorite when favorite is clicked', async () => {
    const user = userEvent.setup()
    render(
      <FavoritesList 
        favorites={mockFavorites} 
        onLoadFavorite={mockOnLoadFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    )
    
    await user.click(screen.getByLabelText('Load weather for London'))
    
    expect(mockOnLoadFavorite).toHaveBeenCalledWith(mockFavorites[0])
  })

  it('should call onRemoveFavorite when remove button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <FavoritesList 
        favorites={mockFavorites} 
        onLoadFavorite={mockOnLoadFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    )
    
    await user.click(screen.getByLabelText('Remove London from favorites'))
    
    expect(mockOnRemoveFavorite).toHaveBeenCalledWith('1')
  })
})