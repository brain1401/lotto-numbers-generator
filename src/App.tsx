import { useState } from 'react'
import Header from './components/Header'
import GeneratorPanel from './components/GeneratorPanel'
import HistoryPanel from './components/HistoryPanel'
import { useHistory } from './hooks/useHistory'

export default function App() {
  const [currentGames, setCurrentGames] = useState<number[][]>([])
  const { history, addEntry, deleteEntry, clearAll } = useHistory()

  const handleGenerate = (games: number[][]) => {
    setCurrentGames(games)
    addEntry(games)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <GeneratorPanel currentGames={currentGames} onGenerate={handleGenerate} />
        <HistoryPanel history={history} onDeleteEntry={deleteEntry} onClearAll={clearAll} />
      </main>
    </div>
  )
}
