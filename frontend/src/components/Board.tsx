import { useEffect, useState } from 'react'
import Dice from './Dice'
import type { BoardProps } from '../types'

export default function Board({
  rollKey,
  selectedDice,
  numberOfDice,
  status,
  result,
  onAllRevealed,
}: BoardProps) {
  const [revealedDice, setRevealedDice] = useState<boolean[]>([])
  const allRevealed = revealedDice.length > 0 && revealedDice.every(Boolean)

  useEffect(() => {
    if (!result) return

    const timeouts = result.rolls.map((_, index) =>
      setTimeout(
        () => {
          setRevealedDice((prev) => {
            const next = result.rolls.map((_, i) =>
              i < index ? (prev[i] ?? false) : false,
            )
            next[index] = true
            return next
          })
        },
        5000 + index * 1000,
      ),
    )

    return () => timeouts.forEach(clearTimeout)
  }, [result])

  useEffect(() => {
    if (allRevealed) {
      onAllRevealed()
    }
  }, [allRevealed, onAllRevealed])

  const dicesToShow = result
    ? result.rolls.map((roll, index) => ({
        value: roll,
        isCritical: result.critical_rolls[index],
        isRevealed: revealedDice[index] ?? false,
      }))
    : Array.from({ length: numberOfDice }, () => ({
        value: 0,
        isCritical: false,
        isRevealed: false,
      }))

  return (
    <div className="board">
      <div className="dice-container">
        {dicesToShow.map((dice, index) => (
          <Dice
            key={index}
            rollKey={rollKey}
            diceType={selectedDice}
            isRolling={
              status === 'rolling' || (result !== null && !allRevealed)
            }
            value={dice.value}
            isCritical={dice.isCritical}
            spinDelay={index * 1000}
            isRevealed={dice.isRevealed}
          />
        ))}
      </div>
    </div>
  )
}
