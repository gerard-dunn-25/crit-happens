import { useEffect, useState } from 'react'
import Dice from './Dice'
import type { BoardProps } from '../types'
import { useTheme } from '../context/useTheme'

export default function Board({
  rollKey,
  selectedDice,
  numberOfDice,
  status,
  result,
  onAllRevealed,
}: BoardProps) {
  const { theme } = useTheme()
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

  const containerClass =
    numberOfDice === 5
      ? 'grid grid-cols-2 gap-8'
      : numberOfDice <= 3
        ? 'flex flex-col items-center justify-center gap-8'
        : 'grid grid-cols-2 gap-8 items-center justify-items-center'

  return (
    <div
      data-theme={theme}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className={containerClass} data-testid="dice-container">
        {numberOfDice === 5 ? (
          <>
            {[0, 1].map((index) => (
              <Dice
                key={index}
                rollKey={rollKey}
                diceType={selectedDice}
                isRolling={
                  status === 'rolling' || (result !== null && !allRevealed)
                }
                value={dicesToShow[index].value}
                isCritical={dicesToShow[index].isCritical}
                spinDelay={index * 1000}
                isRevealed={dicesToShow[index].isRevealed}
              />
            ))}
            <div className="col-span-2 flex justify-center">
              <Dice
                key={4}
                rollKey={rollKey}
                diceType={selectedDice}
                isRolling={
                  status === 'rolling' || (result !== null && !allRevealed)
                }
                value={dicesToShow[4].value}
                isCritical={dicesToShow[4].isCritical}
                spinDelay={4 * 1000}
                isRevealed={dicesToShow[4].isRevealed}
              />
            </div>
            {[2, 3].map((index) => (
              <Dice
                key={index}
                rollKey={rollKey}
                diceType={selectedDice}
                isRolling={
                  status === 'rolling' || (result !== null && !allRevealed)
                }
                value={dicesToShow[index].value}
                isCritical={dicesToShow[index].isCritical}
                spinDelay={index * 1000}
                isRevealed={dicesToShow[index].isRevealed}
              />
            ))}
          </>
        ) : (
          dicesToShow.map((dice, index) => (
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
          ))
        )}
      </div>
    </div>
  )
}
