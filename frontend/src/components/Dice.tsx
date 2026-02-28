import type { DiceProps } from '../types'
import { GiEvilWings, GiAngelWings } from 'react-icons/gi'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import { useTheme } from '../context/useTheme'

export default function Dice({
  rollKey,
  diceType,
  spinDelay,
  value,
  isRolling,
  isCritical,
  isRevealed,
}: DiceProps) {
  const { theme } = useTheme()
  const CritIcon = theme === 'dark' ? GiEvilWings : GiAngelWings

  const controls = useAnimationControls()
  useEffect(() => {
    if (!isRevealed && isRolling) {
      const timeout = setTimeout(async () => {
        controls.set({ rotateZ: 0 })
        // Phase 1: Slow start (0-1s)
        await controls.start({
          rotateZ: 360 * 2,
          transition: { duration: 1, ease: 'easeIn' as const, repeat: 0 },
        })
        // Phase 2: Fast middle (1-2.5s)
        await controls.start({
          rotateZ: 1080 * 2,
          transition: { duration: 1.5, ease: 'linear' as const, repeat: 0 },
        })
        // Phase 3: Slow down (2.5-5s)
        await controls.start({
          rotateZ: 1800 * 2,
          transition: { duration: 2.5, ease: 'easeOut' as const, repeat: 0 },
        })
      }, spinDelay)
      return () => clearTimeout(timeout)
    } else {
      controls.set({ rotateZ: 0 })
      controls.start({
        x: [-8, 8, -8, 8, -4, 4, 0],
        transition: { duration: 0.5, ease: 'easeOut' as const },
      })
    }
  }, [isRolling, isRevealed, controls, rollKey, spinDelay])

  return (
    <div data-theme={theme} className="dice-wrapper">
      <motion.div
        animate={controls}
        className={`text-${theme} text-4xl dice d${diceType} ${isCritical ? 'critical' : ''}`}
      >
        <h2
          className={
            isRevealed && isCritical ? 'text-[var(--color-crimson)]' : ''
          }
        >
          {isRevealed ? isCritical ? <CritIcon /> : value : '?'}
        </h2>
      </motion.div>
    </div>
  )
}
