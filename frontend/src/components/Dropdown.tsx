import { useState, useEffect } from 'react'
import type { DropdownProps } from '../types'
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'

export default function Dropdown({
  availableDiceTypes,
  selectedDice,
  numberOfDice,
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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12"
      >
        <motion.div animate={controls} style={{ color: 'var(--color-icon)' }}>
          <GiDiceTwentyFacesTwenty size={40} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 flex flex-col items-center gap-4 bg-[var(--color-bg)] border-b border-[var(--color-border)] p-4 z-30"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {availableDiceTypes.map((dice) => (
                <button
                  key={dice}
                  className={`px-3 py-2 rounded border ${
                    selectedDice === dice
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300'
                  }`}
                  onClick={() => onDiceTypeChange(dice)}
                >
                  d{dice}
                </button>
              ))}
            </div>

            <div className="dice-count-buttons">
              <button
                onClick={() =>
                  onNumberOfDiceChange(Math.max(1, numberOfDice - 1))
                }
              >
                -
              </button>
              <span>{numberOfDice}</span>
              <button
                onClick={() =>
                  onNumberOfDiceChange(Math.min(6, numberOfDice + 1))
                }
              >
                +
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
