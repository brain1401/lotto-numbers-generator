import { useState } from 'react';
import Header, { type TabType } from './components/Header';
import FairnessNotice from './components/FairnessNotice';
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
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const { history, addEntry, deleteEntry, clearAll } = useHistory();

  const [currentPensionGames, setCurrentPensionGames] = useState<PensionGame[]>([]);
  const [currentPensionEntryId, setCurrentPensionEntryId] = useState<string | null>(null);
  const {
    history: pensionHistory,
    addEntry: addPensionEntry,
    deleteEntry: deletePensionEntry,
    clearAll: clearAllPension,
  } = usePensionHistory();

  const handleGenerate = (games: number[][]) => {
    setCurrentGames(games);
    setCurrentEntryId(addEntry(games));
  };

  const handlePensionGenerate = (games: PensionGame[]) => {
    setCurrentPensionGames(games);
    setCurrentPensionEntryId(addPensionEntry(games));
  };

  // 방금 생성한 결과는 생성 섹션에 이미 보이므로 기록 목록에서는 뺀다
  const previousHistory = history.filter((e) => e.id !== currentEntryId);
  const previousPensionHistory = pensionHistory.filter((e) => e.id !== currentPensionEntryId);

  return (
    <div className="min-h-screen bg-ds-bg">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <FairnessNotice lottery={activeTab} />
        {activeTab === 'lotto' ? (
          <>
            <GeneratorPanel currentGames={currentGames} onGenerate={handleGenerate} />
            <HistoryPanel
              history={previousHistory}
              justSaved={previousHistory.length < history.length}
              onDeleteEntry={deleteEntry}
              onClearAll={clearAll}
            />
          </>
        ) : (
          <>
            <PensionGeneratorPanel
              currentGames={currentPensionGames}
              onGenerate={handlePensionGenerate}
            />
            <PensionHistoryPanel
              history={previousPensionHistory}
              justSaved={previousPensionHistory.length < pensionHistory.length}
              onDeleteEntry={deletePensionEntry}
              onClearAll={clearAllPension}
            />
          </>
        )}
      </main>
    </div>
  );
}
