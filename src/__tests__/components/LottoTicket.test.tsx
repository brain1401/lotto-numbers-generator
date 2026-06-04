import { render, screen } from '@testing-library/react'
import LottoTicket from '../../components/LottoTicket'

describe('LottoTicket', () => {
  const numbers = [3, 12, 24, 35, 41, 45]

  it('renders all 6 numbers', () => {
    render(<LottoTicket numbers={numbers} />)
    numbers.forEach(n => {
      expect(screen.getByText(String(n))).toBeInTheDocument()
    })
  })

  it('renders the label when provided', () => {
    render(<LottoTicket numbers={numbers} label="게임 A" />)
    expect(screen.getByText('게임 A')).toBeInTheDocument()
  })

  it('renders without label when not provided', () => {
    const { queryByText } = render(<LottoTicket numbers={numbers} />)
    expect(queryByText('게임 A')).not.toBeInTheDocument()
  })
})
