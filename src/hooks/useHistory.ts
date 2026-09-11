import { useState } from 'react';
import type { LottoEntry } from '../types';

const STORAGE_KEY = 'lotto-history';
const MAX_ENTRIES = 50;

function loadFromStorage(): LottoEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LottoEntry[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(entries: LottoEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // QuotaExceededError 등 — 무시
  }
}

export function useHistory() {
  const [history, setHistory] = useState<LottoEntry[]>(loadFromStorage);

  const addEntry = (games: number[][]): string => {
    const entry: LottoEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      games,
    };
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES);
      saveToStorage(updated);
      return updated;
    });
    return entry.id;
  };

  const deleteEntry = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveToStorage(updated);
      return updated;
    });
  };

  const clearAll = () => {
    setHistory([]);
    saveToStorage([]);
  };

  return { history, addEntry, deleteEntry, clearAll };
}
