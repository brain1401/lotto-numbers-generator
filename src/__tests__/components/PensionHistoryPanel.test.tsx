import type { ComponentProps } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PensionHistoryPanel from '../../components/PensionHistoryPanel';
import type { PensionEntry } from '../../types';

const makeEntry = (id: string): PensionEntry => ({
  id,
  timestamp: 1700000000000,
  games: [{ group: 2, digits: '472891' }],
});

const renderPanel = (props: Partial<ComponentProps<typeof PensionHistoryPanel>> = {}) =>
  render(
    <PensionHistoryPanel
      history={[]}
      justSaved={false}
      onDeleteEntry={vi.fn()}
      onClearAll={vi.fn()}
      {...props}
    />,
  );

const openHistory = () => fireEvent.click(screen.getByRole('button', { name: /이전 기록/ }));

describe('PensionHistoryPanel', () => {
  it('이전 기록도 방금 저장한 결과도 없으면 아무것도 렌더링하지 않는다', () => {
    const { container } = renderPanel();
    expect(container).toBeEmptyDOMElement();
  });

  it('방금 저장한 결과만 있으면 저장 안내만 표시한다', () => {
    renderPanel({ justSaved: true });
    expect(screen.getByText('기록에 저장됨')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /이전 기록/ })).not.toBeInTheDocument();
  });

  it('기록은 기본적으로 접혀 있다', () => {
    renderPanel({ history: [makeEntry('1')] });
    expect(screen.getByRole('button', { name: /이전 기록 1개/ })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByText('2조')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '전체 삭제' })).not.toBeInTheDocument();
  });

  it('이전 기록 버튼을 누르면 기록 항목이 펼쳐진다', () => {
    renderPanel({ history: [makeEntry('1')] });
    openHistory();
    expect(screen.getByText('2조')).toBeInTheDocument();
  });

  it('삭제 버튼 클릭 시 onDeleteEntry가 호출된다', () => {
    const onDelete = vi.fn();
    renderPanel({ history: [makeEntry('abc')], onDeleteEntry: onDelete });
    openHistory();
    fireEvent.click(screen.getByRole('button', { name: '이 기록 삭제' }));
    expect(onDelete).toHaveBeenCalledWith('abc');
  });

  it('전체 삭제 버튼 클릭 시 onClearAll이 호출된다', () => {
    const onClearAll = vi.fn();
    renderPanel({ history: [makeEntry('1')], onClearAll });
    openHistory();
    fireEvent.click(screen.getByRole('button', { name: '전체 삭제' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});
