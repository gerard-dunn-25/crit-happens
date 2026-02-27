import type { BoardProps } from '../types'
import Dice from './Dice'
import { useEffect, useRef, useState } from 'react'

export default function Board({ selectedDice, result }: BoardProps) {
  const [revealedDice, setRevealedDice] = useState<boolean[]>([])

  const prevResultRef = useRef<typeof result>(null)

useEffect(() => {
  if (!result || prevResultRef.current === result) return
  
  prevResultRef.current = result

  const timeouts = result.rolls.map((_, index) =>
    setTimeout(() => {
      setRevealedDice((prev) => {
        const next = result.rolls.map((_, i) => i <= index ? (prev[i] ?? false) : false)
        next[index] = true
        return next
      })
    }, (index + 1) * 800)
  )

  return () => timeouts.forEach(clearTimeout)
}, [result])

  return (
    <div className="board">
      {result && (
        <div className="dice-container">
          {result.rolls.map((roll, index) => (
            <Dice
              key={index}
              index={index}
              diceType={selectedDice}
              value={roll}
              isCritical={result.critical_rolls[index]}
              isRevealed={revealedDice[index] ?? false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
