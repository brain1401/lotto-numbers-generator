import { useState } from 'react'
import { generateLottoNumbers } from '../utils/lotto'
import GameCountSelector from './GameCountSelector'
import LottoTicket from './LottoTicket'

interface GeneratorPanelProps {
  currentGames: number[][]
  onGenerate: (games: number[][]) => void
}

const GAME_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export default function GeneratorPanel({ currentGames, onGenerate }: GeneratorPanelProps) {
  const [gameCount, setGameCount] = useState(5)

  const handleGenerate = () => {
    const games = Array.from({ length: gameCount }, () => generateLottoNumbers())
    onGenerate(games)
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <GameCountSelector count={gameCount} onChange={setGameCount} />
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        >
          번호 생성
        </button>
      </div>

      {currentGames.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentGames.map((nums, i) => (
            <LottoTicket key={i} numbers={nums} label={`게임 ${GAME_LABELS[i]}`} />
          ))}
        </div>
      )}
    </section>
  )
}
