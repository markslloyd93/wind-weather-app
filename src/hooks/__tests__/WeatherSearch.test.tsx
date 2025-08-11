import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WeatherSearch } from '../../components/WeatherSearch'

describe('WeatherSearch', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search input and button', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />)
    
    expect(screen.getByLabelText(/search for weather/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('should call onSearch when form is submitted', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />)
    
    const input = screen.getByLabelText(/search for weather/i)
    const button = screen.getByRole('button', { name: /search/i })

    await user.type(input, 'London')
    await user.click(button)

    expect(mockOnSearch).toHaveBeenCalledWith('London')
  })

  it('should clear input after search', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />)
    
    const input = screen.getByLabelText(/search for weather/i) as HTMLInputElement

    await user.type(input, 'London')
    fireEvent.submit(input.closest('form')!)

    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })

  it('should not submit empty search', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />)
    
    const button = screen.getByRole('button', { name: /search/i })
    await user.click(button)

    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('should disable input and button when loading', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={true} />)
    
    expect(screen.getByLabelText(/search for weather/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled()
  })

  it('should show loading text when searching', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={true} />)
    
    expect(screen.getByRole('button', { name: /searching/i })).toBeInTheDocument()
  })
})