import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePensionHistory } from '../../hooks/usePensionHistory';

beforeEach(() => localStorage.clear());

describe('usePensionHistory', () => {
  const game1 = { group: 1, digits: '123456' };
  const game2 = { group: 3, digits: '000001' };

  it('초기 상태는 빈 배열이다', () => {
    const { result } = renderHook(() => usePensionHistory());
    expect(result.current.history).toEqual([]);
  });

  it('addEntry로 항목을 추가할 수 있다', () => {
    const { result } = renderHook(() => usePensionHistory());
    act(() => result.current.addEntry([game1]));
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].games).toEqual([game1]);
  });

  it('addEntry는 새 항목의 id를 반환한다', () => {
    const { result } = renderHook(() => usePensionHistory());
    let id = '';
    act(() => {
      id = result.current.addEntry([game1]);
    });
    expect(result.current.history[0].id).toBe(id);
  });

  it('deleteEntry로 항목을 삭제할 수 있다', () => {
    const { result } = renderHook(() => usePensionHistory());
    act(() => result.current.addEntry([game1]));
    const id = result.current.history[0].id;
    act(() => result.current.deleteEntry(id));
    expect(result.current.history).toHaveLength(0);
  });

  it('clearAll로 전체 삭제된다', () => {
    const { result } = renderHook(() => usePensionHistory());
    act(() => result.current.addEntry([game1]));
    act(() => result.current.addEntry([game2]));
    act(() => result.current.clearAll());
    expect(result.current.history).toHaveLength(0);
  });

  it('localStorage에 pension-history 키로 저장된다', () => {
    const { result } = renderHook(() => usePensionHistory());
    act(() => result.current.addEntry([game1]));
    expect(localStorage.getItem('pension-history')).not.toBeNull();
    expect(localStorage.getItem('lotto-history')).toBeNull();
  });
});
