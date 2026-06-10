import { useState } from 'react';
import Header, { type TabType } from './components/Header';
import GeneratorPanel from './components/GeneratorPanel';
import HistoryPanel from './components/HistoryPanel';
import PensionGeneratorPanel from './components/PensionGeneratorPanel';
import PensionHistoryPanel from './components/PensionHistoryPanel';
import { useHistory } from './hooks/useHistory';
import { usePensionHistory } from './hooks/usePensionHistory';
import type { PensionGame } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('lotto');

  const [currentGames, setCurrentGames] = useState<number[][]>([]);
  const { history, addEntry, deleteEntry, clearAll } = useHistory();

  const [currentPensionGames, setCurrentPensionGames] = useState<PensionGame[]>([]);
  const {
    history: pensionHistory,
    addEntry: addPensionEntry,
    deleteEntry: deletePensionEntry,
    clearAll: clearAllPension,
  } = usePensionHistory();

  const handleGenerate = (games: number[][]) => {
    setCurrentGames(games);
    addEntry(games);
  };

  const handlePensionGenerate = (games: PensionGame[]) => {
    setCurrentPensionGames(games);
    addPensionEntry(games);
  };

  return (
    <div className="min-h-screen bg-ds-bg">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {activeTab === 'lotto' ? (
          <>
            <GeneratorPanel currentGames={currentGames} onGenerate={handleGenerate} />
            <HistoryPanel history={history} onDeleteEntry={deleteEntry} onClearAll={clearAll} />
          </>
        ) : (
          <>
            <PensionGeneratorPanel
              currentGames={currentPensionGames}
              onGenerate={handlePensionGenerate}
            />
            <PensionHistoryPanel
              history={pensionHistory}
              onDeleteEntry={deletePensionEntry}
              onClearAll={clearAllPension}
            />
          </>
        )}
      </main>
    </div>
  );
}
