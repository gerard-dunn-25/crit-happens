import { useEffect, useState, useRef } from 'react'
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
  skipAnimation,
}: BoardProps) {
  const { theme } = useTheme()
  const [revealedDice, setRevealedDice] = useState<boolean[]>([])
  const allRevealed = revealedDice.length > 0 && revealedDice.every(Boolean)
  const containerRef = useRef<HTMLDivElement>(null)
  const [availableHeight, setAvailableHeight] = useState(400)
  const [availableWidth, setAvailableWidth] = useState(300)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setAvailableHeight(entry.contentRect.height)
        setAvailableWidth(entry.contentRect.width)
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!result) return

    const baseDelay = skipAnimation ? 200 : 5000
    const intervalDelay = skipAnimation ? 200 : 1000

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
        baseDelay + index * intervalDelay,
      ),
    )

    return () => timeouts.forEach(clearTimeout)
  }, [result, skipAnimation])

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

  const rows = numberOfDice <= 3 ? numberOfDice : numberOfDice <= 4 ? 2 : 3
  const cols = numberOfDice <= 3 ? 1 : 2
  const gap = 32
  const padding = 80

  const maxByHeight = Math.floor(
    (availableHeight - padding - gap * (rows - 1)) / rows,
  )
  const maxByWidth = Math.floor(
    (availableWidth - padding - gap * (cols - 1)) / cols,
  )
  const isMobile = availableWidth < 480
  const maxDiceSize = isMobile ? 90 : 150
  const diceSize = Math.min(maxDiceSize, maxByHeight, maxByWidth)

  const containerClass =
    numberOfDice === 5
      ? 'grid grid-cols-2 gap-8'
      : numberOfDice <= 3
        ? 'flex flex-col items-center justify-center gap-8'
        : 'grid grid-cols-2 gap-8 items-center justify-items-center'

  return (
    <div
      ref={containerRef}
      data-theme={theme}
      className="w-full h-full flex items-center justify-center p-4"
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
                diceSize={diceSize}
                skipAnimation={skipAnimation}
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
                diceSize={diceSize}
                skipAnimation={skipAnimation}
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
                diceSize={diceSize}
                skipAnimation={skipAnimation}
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
              diceSize={diceSize}
              skipAnimation={skipAnimation}
            />
          ))
        )}
      </div>
    </div>
  )
}
