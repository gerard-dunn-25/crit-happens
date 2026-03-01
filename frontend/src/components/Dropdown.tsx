import { useState, useEffect } from 'react'
import type { DropdownProps } from '../types'
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import { numberedDice } from '../utils/diceShapes'

export default function Dropdown({
  availableDiceTypes,
  selectedDice,
  numberOfDice,
  onOpenChange,
  onDiceTypeChange,
  onNumberOfDiceChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const controls = useAnimationControls()

  useEffect(() => {
    controls.set({ rotate: 0 })
  }, [controls])

  useEffect(() => {
    if (isOpen) {
      controls.start({
        rotateZ: [0, 360],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        },
      })
    } else {
      controls.start({
        rotateZ: 360,
        transition: { duration: 0.3, ease: 'linear' },
      })
    }
  }, [isOpen, controls])

  const handleToggle = () => {
    const next = !isOpen
    setIsOpen(next)
    onOpenChange(next)
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-16 h-16"
      >
        <motion.div animate={controls} style={{ color: 'var(--color-icon)' }}>
          <GiDiceTwentyFacesTwenty size={56} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-0 right-0 flex flex-col items-center gap-4 bg-[var(--color-bg)] border-b font-bold border-[var(--color-border)] p-4 z-30"
          >
            {/* Dice type selection */}
            <div className="flex flex-wrap justify-center gap-4">
              {availableDiceTypes.map((dice) => (
                <button
                  key={dice}
                  onClick={() => onDiceTypeChange(dice)}
                  className="flex flex-col items-center gap-1"
                >
                  <img
                    src={numberedDice[dice]}
                    alt={`d${dice}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      opacity: selectedDice === dice ? 1 : 0.4,
                      transition: 'opacity 0.2s',
                      filter: 'var(--dice-filter)',
                    }}
                  />
                  <span className="text-xs text-[var(--color-text)] opacity-70">
                    d{dice}
                  </span>
                </button>
              ))}
            </div>

            <div className="w-full flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() =>
                    onNumberOfDiceChange(Math.max(1, numberOfDice - 1))
                  }
                  className="text-2xl text-[var(--color-button)] w-8 h-8 flex items-center justify-center"
                >
                  -
                </button>
                <div className="flex flex-col items-center gap-1">
                  <img
                    src={numberedDice[selectedDice]}
                    alt={`d${selectedDice}`}
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'var(--dice-filter)',
                    }}
                  />
                  <span className="text-sm text-[var(--color-text)]">
                    {numberOfDice}
                  </span>
                </div>
                <button
                  onClick={() =>
                    onNumberOfDiceChange(Math.min(6, numberOfDice + 1))
                  }
                  className="text-2xl text-[var(--color-button)] w-8 h-8 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
