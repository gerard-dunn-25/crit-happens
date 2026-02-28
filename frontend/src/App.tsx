import { useState, useEffect } from 'react'
import { rollDice, getDiceTypes } from './api'
import type { RollResult, DiceType, Status } from './types'
import Results from './components/Results'
import Board from './components/Board'
import Dropdown from './components/Dropdown'

export default function App() {
  const [availableDiceTypes, setAvailableDiceTypes] = useState<DiceType[]>([])
  const [selectedDice, setSelectedDice] = useState<DiceType>(20)
  const [numberOfDice, setNumberOfDice] = useState(1)
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<RollResult | null>(null)
  const [allRevealed, setAllRevealed] = useState(false)
  const [rollKey, setRollKey] = useState(0)

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
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-4xl">Crit Happens!</h1>
      <Dropdown
        availableDiceTypes={availableDiceTypes}
        selectedDice={selectedDice}
        numberOfDice={numberOfDice}
        onDiceTypeChange={handleDiceTypeChange}
        onNumberOfDiceChange={handleNumberOfDiceChange}
      />
      <Board
        key={rollKey}
        rollKey={rollKey}
        selectedDice={selectedDice}
        numberOfDice={numberOfDice}
        result={result}
        status={status}
        onAllRevealed={handleAllRevealed}
      />
      {allRevealed && <Results result={result} />}
      <button onClick={handleRollDice} className="px-8 py-4 text-xl">
        Roll
      </button>
    </div>
  )
}
