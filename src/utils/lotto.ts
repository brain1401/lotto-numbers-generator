import { unbiasedShuffle } from './random';

export function generateLottoNumbers(): number[] {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  unbiasedShuffle(pool);
  return pool.slice(0, 6).sort((a, b) => a - b);
}

export const GAME_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as const;
