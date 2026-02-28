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
    <div className="fixed top-4 right-4 z-10">
      <button onClick={() => setIsOpen(!isOpen)}>
        <motion.div animate={controls}>
          <GiDiceTwentyFacesTwenty size={48} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-4 flex flex-col items-end gap-2"
          >
            <label>Select Dice Type:</label>
            <div className="dice-type-buttons">
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
            <label>Number of Dice:</label>
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
