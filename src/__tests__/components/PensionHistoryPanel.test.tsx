import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PensionHistoryPanel from '../../components/PensionHistoryPanel';
import type { PensionEntry } from '../../types';

const makeEntry = (id: string): PensionEntry => ({
  id,
  timestamp: 1700000000000,
  games: [{ group: 2, digits: '472891' }],
});

describe('PensionHistoryPanel', () => {
  it('빈 기록일 때 안내 문구를 표시한다', () => {
    render(<PensionHistoryPanel history={[]} onDeleteEntry={vi.fn()} onClearAll={vi.fn()} />);
    expect(screen.getByText(/번호를 생성하면 여기에 기록됩니다/)).toBeInTheDocument();
  });

  it('기록 항목을 렌더링한다', () => {
    render(
      <PensionHistoryPanel
        history={[makeEntry('1')]}
        onDeleteEntry={vi.fn()}
        onClearAll={vi.fn()}
      />,
    );
    expect(screen.getByText('2조')).toBeInTheDocument();
  });

  it('삭제 버튼 클릭 시 onDeleteEntry가 호출된다', () => {
    const onDelete = vi.fn();
    render(
      <PensionHistoryPanel
        history={[makeEntry('abc')]}
        onDeleteEntry={onDelete}
        onClearAll={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '이 기록 삭제' }));
    expect(onDelete).toHaveBeenCalledWith('abc');
  });

  it('전체 삭제 버튼 클릭 시 onClearAll이 호출된다', () => {
    const onClearAll = vi.fn();
    render(
      <PensionHistoryPanel
        history={[makeEntry('1')]}
        onDeleteEntry={vi.fn()}
        onClearAll={onClearAll}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '전체 삭제' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});
