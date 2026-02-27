import type { DiceProps } from '../types'
import { GiBurningSkull } from 'react-icons/gi'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export default function Dice({
  diceType,
  value,
  isCritical,
  isRevealed,
}: DiceProps) {
  const controls = useAnimationControls()
  useEffect(() => {
    if (isRevealed === false) {
      controls.start({
        rotateZ: [0, 360],
        transition: {
          duration: 5,
          times: [0, 1],
          ease: [0.2, 0, 0.8, 1], // slow start, fast middle, slow end
          repeat: 0,
        },
      })
    } else {
      controls.start({
        x: [-8, 8, -8, 8, -4, 4, 0],
        transition: { duration: 0.5, ease: 'easeOut' as const },
      })
    }
  }, [isRevealed, controls])

  return (
    <motion.div
      animate={controls}
      className={`dice d${diceType} ${isCritical ? 'critical' : ''}`}
    >
      <h2>
        d{diceType}: {isCritical ? <GiBurningSkull /> : value}
      </h2>
    </motion.div>
  )
}
