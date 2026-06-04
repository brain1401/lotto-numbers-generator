import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GeneratorPanel from '../../components/GeneratorPanel'

describe('GeneratorPanel', () => {
  it('renders the generate button', () => {
    render(<GeneratorPanel currentGames={[]} onGenerate={() => {}} />)
    expect(screen.getByRole('button', { name: '번호 생성' })).toBeInTheDocument()
  })

  it('calls onGenerate with 5 games by default when button is clicked', async () => {
    const onGenerate = vi.fn()
    render(<GeneratorPanel currentGames={[]} onGenerate={onGenerate} />)
    await userEvent.click(screen.getByRole('button', { name: '번호 생성' }))
    expect(onGenerate).toHaveBeenCalledTimes(1)
    const [games] = onGenerate.mock.calls[0] as [number[][]]
    expect(games).toHaveLength(5)
    games.forEach(g => {
      expect(g).toHaveLength(6)
      expect(new Set(g).size).toBe(6)
    })
  })

  it('renders currentGames as tickets', () => {
    const games = [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12]]
    render(<GeneratorPanel currentGames={games} onGenerate={() => {}} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('renders no tickets when currentGames is empty', () => {
    render(<GeneratorPanel currentGames={[]} onGenerate={() => {}} />)
    expect(screen.queryByText('게임 A')).not.toBeInTheDocument()
  })
})
