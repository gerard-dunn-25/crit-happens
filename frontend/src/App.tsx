import { useState, useEffect } from 'react'
import { useTheme } from './context/useTheme'
import { rollDice, getDiceTypes } from './api'
import type { RollResult, DiceType, Status } from './types'
import Results from './components/Results'
import Board from './components/Board'
import Dropdown from './components/Dropdown'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function App() {
  const [availableDiceTypes, setAvailableDiceTypes] = useState<DiceType[]>([])
  const [selectedDice, setSelectedDice] = useState<DiceType>(20)
  const [numberOfDice, setNumberOfDice] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<RollResult | null>(null)
  const [allRevealed, setAllRevealed] = useState(false)
  const [rollKey, setRollKey] = useState(0)

  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const fetchDiceTypes = async () => {
      try {
        const response = await getDiceTypes()
        setAvailableDiceTypes(response.dice_types)
      } catch (error) {
        console.error('Error fetching dice types:', error)
        setStatus('error')
      }
    }
    fetchDiceTypes()
  }, [])

  function handleAllRevealed() {
    setAllRevealed(true)
  }

  function handleDiceTypeChange(dice: DiceType) {
    setSelectedDice(dice)
    setResult(null)
    setAllRevealed(false)
    setRollKey((prev) => prev + 1)
  }

  function handleNumberOfDiceChange(count: number) {
    setNumberOfDice(count)
    setResult(null)
    setAllRevealed(false)
    setRollKey((prev) => prev + 1)
  }

  async function handleRollDice() {
    try {
      setAllRevealed(false)
      setResult(null) // Reset result so board clears
      setRollKey((prev) => prev + 1)
      setStatus('rolling')
      const result = await rollDice({ diceType: selectedDice, numberOfDice })
      setResult(result)
      setStatus('idle')
    } catch (error) {
      console.error('Error rolling dice:', error)
      setStatus('error')
    }
  }

  return (
    <div
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"
      style={{ fontFamily: 'var(--font-title)' }}
    >
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-4 py-3 w-full">
          <h1 className="text-2xl text-[var(--color-title)] font-bold tracking-widest uppercase">
            Crit Happens!
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`relative w-16 h-10 rounded-full transition-colors duration-300 flex items-center px-1 ${
                theme === 'dark'
                  ? 'bg-[var(--color-toggle)]'
                  : 'bg-[var(--color-toggle)]'
              }`}
            >
              <span
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 bg-[var(--color-bg)] ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {theme === 'dark' ? <FiMoon size={16} /> : <FiSun size={16} />}
              </span>
            </button>
            <Dropdown
              availableDiceTypes={availableDiceTypes}
              selectedDice={selectedDice}
              numberOfDice={numberOfDice}
              onOpenChange={setDropdownOpen}
              onDiceTypeChange={handleDiceTypeChange}
              onNumberOfDiceChange={handleNumberOfDiceChange}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col items-center pb-32 min-h-screen transition-all duration-200 ${dropdownOpen ? 'pt-64' : 'pt-20'}`}
      >
        <Board
          key={rollKey}
          rollKey={rollKey}
          selectedDice={selectedDice}
          numberOfDice={numberOfDice}
          result={result}
          status={status}
          onAllRevealed={handleAllRevealed}
        />
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-2 px-4 py-3 bg-[var(--color-bg)] border-t border-[var(--color-border)] z-20">
        {allRevealed && <Results result={result} />}
        <button
          onClick={handleRollDice}
          className="w-full py-4 text-xl uppercase tracking-widest text-[var(--color-text)] bg-[var(--color-button)] font-bold rounded"
        >
          Roll
        </button>
      </div>
    </div>
  )
}
