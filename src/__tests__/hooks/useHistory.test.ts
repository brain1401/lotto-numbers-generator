import { renderHook, act } from '@testing-library/react';
import { useHistory } from '../../hooks/useHistory';

beforeEach(() => {
  localStorage.clear();
});

describe('useHistory', () => {
  it('starts with empty history when localStorage is empty', () => {
    const { result } = renderHook(() => useHistory());
    expect(result.current.history).toEqual([]);
  });

  it('addEntry adds a new entry at the front', () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addEntry([[1, 2, 3, 4, 5, 6]]);
    });
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].games).toEqual([[1, 2, 3, 4, 5, 6]]);
  });

  it('addEntry persists to localStorage', () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addEntry([[1, 2, 3, 4, 5, 6]]);
    });
    const stored = JSON.parse(localStorage.getItem('lotto-history') ?? '[]');
    expect(stored).toHaveLength(1);
  });

  it('loads existing history from localStorage on mount', () => {
    const existing = [{ id: 'abc', timestamp: 1000, games: [[1, 2, 3, 4, 5, 6]] }];
    localStorage.setItem('lotto-history', JSON.stringify(existing));
    const { result } = renderHook(() => useHistory());
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].id).toBe('abc');
  });

  it('deleteEntry removes the entry with the given id', () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addEntry([[1, 2, 3, 4, 5, 6]]);
    });
    const id = result.current.history[0].id;
    act(() => {
      result.current.deleteEntry(id);
    });
    expect(result.current.history).toHaveLength(0);
  });

  it('clearAll removes all entries and clears localStorage', () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addEntry([[1, 2, 3, 4, 5, 6]]);
    });
    act(() => {
      result.current.addEntry([[7, 8, 9, 10, 11, 12]]);
    });
    act(() => {
      result.current.clearAll();
    });
    expect(result.current.history).toHaveLength(0);
    expect(localStorage.getItem('lotto-history')).toBe('[]');
  });

  it('caps history at 50 entries', () => {
    const { result } = renderHook(() => useHistory());
    for (let i = 0; i < 55; i++) {
      act(() => {
        result.current.addEntry([[1, 2, 3, 4, 5, 6]]);
      });
    }
    expect(result.current.history).toHaveLength(50);
  });
});
