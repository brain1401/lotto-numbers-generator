import { render, screen } from '@testing-library/react'
import NumberBall from '../../components/NumberBall'

describe('NumberBall', () => {
  it('renders the number', () => {
    render(<NumberBall number={7} />)
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('applies yellow class for numbers 1–10', () => {
    const { container } = render(<NumberBall number={5} />)
    expect(container.firstChild).toHaveClass('bg-yellow-400')
  })

  it('applies blue class for numbers 11–20', () => {
    const { container } = render(<NumberBall number={15} />)
    expect(container.firstChild).toHaveClass('bg-blue-500')
  })

  it('applies red class for numbers 21–30', () => {
    const { container } = render(<NumberBall number={25} />)
    expect(container.firstChild).toHaveClass('bg-red-500')
  })

  it('applies gray class for numbers 31–40', () => {
    const { container } = render(<NumberBall number={35} />)
    expect(container.firstChild).toHaveClass('bg-gray-400')
  })

  it('applies green class for numbers 41–45', () => {
    const { container } = render(<NumberBall number={43} />)
    expect(container.firstChild).toHaveClass('bg-green-500')
  })
})
