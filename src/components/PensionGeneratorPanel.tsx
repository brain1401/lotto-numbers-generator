import { useState } from 'react';
import { generatePensionNumber } from '../utils/pension';
import { GAME_LABELS } from '../utils/lotto';
import type { PensionGame } from '../types';
import GameCountSelector from './GameCountSelector';
import PensionTicket from './PensionTicket';

interface PensionGeneratorPanelProps {
  currentGames: PensionGame[];
  onGenerate: (games: PensionGame[]) => void;
}

export default function PensionGeneratorPanel({
  currentGames,
  onGenerate,
}: PensionGeneratorPanelProps) {
  const [gameCount, setGameCount] = useState(5);
  const [generationKey, setGenerationKey] = useState(0);

  const handleGenerate = () => {
    const games = Array.from({ length: gameCount }, () => generatePensionNumber());
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentGames.map((game, i) => (
            <PensionTicket
              key={`${generationKey}-${i}`}
              group={game.group}
              digits={game.digits}
              label={`게임 ${GAME_LABELS[i]}`}
              animate
            />
          ))}
        </div>
      )}
    </section>
  );
}
