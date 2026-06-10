import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PensionGeneratorPanel from '../../components/PensionGeneratorPanel';
import type { PensionGame } from '../../types';

describe('PensionGeneratorPanel', () => {
  it('번호 생성 버튼이 있다', () => {
    render(<PensionGeneratorPanel currentGames={[]} onGenerate={vi.fn()} />);
    expect(screen.getByRole('button', { name: '번호 생성' })).toBeInTheDocument();
  });

  it('번호 생성 클릭 시 onGenerate가 호출된다', () => {
    const onGenerate = vi.fn();
    render(<PensionGeneratorPanel currentGames={[]} onGenerate={onGenerate} />);
    fireEvent.click(screen.getByRole('button', { name: '번호 생성' }));
    expect(onGenerate).toHaveBeenCalledTimes(1);
    const games: PensionGame[] = onGenerate.mock.calls[0][0];
    expect(games.length).toBeGreaterThanOrEqual(1);
    expect(games[0]).toHaveProperty('group');
    expect(games[0]).toHaveProperty('digits');
  });

  it('currentGames가 있으면 티켓을 렌더링한다', () => {
    const games: PensionGame[] = [
      { group: 2, digits: '123456' },
      { group: 4, digits: '000001' },
    ];
    render(<PensionGeneratorPanel currentGames={games} onGenerate={vi.fn()} />);
    expect(screen.getByText('2조')).toBeInTheDocument();
    expect(screen.getByText('4조')).toBeInTheDocument();
  });
});
