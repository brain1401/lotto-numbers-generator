import { useState } from 'react';
import { generateLottoNumbers, GAME_LABELS } from '../utils/lotto';
import GameCountSelector from './GameCountSelector';
import LottoTicket from './LottoTicket';

interface GeneratorPanelProps {
  currentGames: number[][];
  onGenerate: (games: number[][]) => void;
}

export default function GeneratorPanel({ currentGames, onGenerate }: GeneratorPanelProps) {
  const [gameCount, setGameCount] = useState(5);
  const [generationKey, setGenerationKey] = useState(0);

  const handleGenerate = () => {
    const games = Array.from({ length: gameCount }, () => generateLottoNumbers());
    setGenerationKey((k) => k + 1);
    onGenerate(games);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <GameCountSelector count={gameCount} onChange={setGameCount} />
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 bg-ds-primary text-ds-ink text-sm font-semibold rounded-lg hover:bg-ds-primary-hover transition-colors duration-150 focus-visible-ring"
        >
          번호 생성
        </button>
      </div>

      {currentGames.length > 0 && (
        <div className="ticket-grid gap-3">
          {currentGames.map((nums, i) => (
            <LottoTicket
              key={`${generationKey}-${i}`}
              numbers={nums}
              label={`게임 ${GAME_LABELS[i]}`}
              animate
            />
          ))}
        </div>
      )}
    </section>
  );
}
