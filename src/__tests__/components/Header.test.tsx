import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'

describe('Header', () => {
  it('renders an h1 heading', () => {
    render(<Header />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
