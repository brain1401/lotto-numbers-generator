import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPanel from '../../components/HistoryPanel';
import type { LottoEntry } from '../../types';

function makeEntry(id: string, games: number[][]): LottoEntry {
  return { id, timestamp: new Date('2026-01-01T12:00:00').getTime(), games };
}

describe('HistoryPanel', () => {
  it('shows empty message when history is empty', () => {
    render(<HistoryPanel history={[]} onDeleteEntry={() => {}} onClearAll={() => {}} />);
    expect(screen.getByText(/번호를 생성하면 여기에 기록됩니다/)).toBeInTheDocument();
  });

  it('renders history entries', () => {
    const history = [makeEntry('1', [[1, 2, 3, 4, 5, 6]])];
    render(<HistoryPanel history={history} onDeleteEntry={() => {}} onClearAll={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onDeleteEntry with the entry id when 삭제 is clicked', async () => {
    const onDelete = vi.fn();
    const history = [makeEntry('abc', [[1, 2, 3, 4, 5, 6]])];
    render(<HistoryPanel history={history} onDeleteEntry={onDelete} onClearAll={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: '이 기록 삭제' }));
    expect(onDelete).toHaveBeenCalledWith('abc');
  });

  it('calls onClearAll when 전체 삭제 is clicked', async () => {
    const onClearAll = vi.fn();
    const history = [makeEntry('1', [[1, 2, 3, 4, 5, 6]])];
    render(<HistoryPanel history={history} onDeleteEntry={() => {}} onClearAll={onClearAll} />);
    await userEvent.click(screen.getByRole('button', { name: '전체 삭제' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('is expanded by default', () => {
    const history = [makeEntry('1', [[1, 2, 3, 4, 5, 6]])];
    render(<HistoryPanel history={history} onDeleteEntry={() => {}} onClearAll={() => {}} />);
    expect(screen.getByText('1')).toBeVisible();
  });

  it('hides content when 접기 is clicked', async () => {
    const history = [makeEntry('1', [[1, 2, 3, 4, 5, 6]])];
    render(<HistoryPanel history={history} onDeleteEntry={() => {}} onClearAll={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: '접기' }));
    expect(screen.getByText('1')).not.toBeVisible();
  });
});
