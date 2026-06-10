import { useState } from 'react';
import type { PensionEntry, PensionGame } from '../types';

const STORAGE_KEY = 'pension-history';
const MAX_ENTRIES = 50;

function loadFromStorage(): PensionEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PensionEntry[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(entries: PensionEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // QuotaExceededError — 무시
  }
}

export function usePensionHistory() {
  const [history, setHistory] = useState<PensionEntry[]>(loadFromStorage);

  const addEntry = (games: PensionGame[]) => {
    const entry: PensionEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      games,
    };
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES);
      saveToStorage(updated);
      return updated;
    });
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
