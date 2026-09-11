import type { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPanel from '../../components/HistoryPanel';
import type { LottoEntry } from '../../types';

function makeEntry(id: string, games: number[][]): LottoEntry {
  return { id, timestamp: new Date('2026-01-01T12:00:00').getTime(), games };
}

function renderPanel(props: Partial<ComponentProps<typeof HistoryPanel>> = {}) {
  return render(
    <HistoryPanel
      history={[]}
      justSaved={false}
      onDeleteEntry={() => {}}
      onClearAll={() => {}}
      {...props}
    />,
  );
}

const openHistory = () => userEvent.click(screen.getByRole('button', { name: /이전 기록/ }));

describe('HistoryPanel', () => {
  it('renders nothing when there is no previous history and nothing was just saved', () => {
    const { container } = renderPanel();
    expect(container).toBeEmptyDOMElement();
  });

  it('shows only the saved notice when the current result is the only entry', () => {
    renderPanel({ justSaved: true });
    expect(screen.getByText('기록에 저장됨')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /이전 기록/ })).not.toBeInTheDocument();
  });

  it('is collapsed by default', () => {
    renderPanel({ history: [makeEntry('1', [[7, 8, 9, 10, 11, 12]])] });
    expect(screen.getByRole('button', { name: /이전 기록 1개/ })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByText('7')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '전체 삭제' })).not.toBeInTheDocument();
  });

  it('shows previous entries when the trigger is clicked', async () => {
    renderPanel({ history: [makeEntry('1', [[7, 8, 9, 10, 11, 12]])] });
    await openHistory();
    expect(screen.getByRole('button', { name: /이전 기록 1개/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText('7')).toBeVisible();
  });

  it('calls onDeleteEntry with the entry id when 삭제 is clicked', async () => {
    const onDelete = vi.fn();
    renderPanel({ history: [makeEntry('abc', [[7, 8, 9, 10, 11, 12]])], onDeleteEntry: onDelete });
    await openHistory();
    await userEvent.click(screen.getByRole('button', { name: '이 기록 삭제' }));
    expect(onDelete).toHaveBeenCalledWith('abc');
  });

  it('calls onClearAll when 전체 삭제 is clicked', async () => {
    const onClearAll = vi.fn();
    renderPanel({ history: [makeEntry('1', [[7, 8, 9, 10, 11, 12]])], onClearAll });
    await openHistory();
    await userEvent.click(screen.getByRole('button', { name: '전체 삭제' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});
