import type { DiceProps } from '../types'
import { GiAngelWings, GiBurningSkull } from 'react-icons/gi'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import { useTheme } from '../context/useTheme'
import { blankDice } from '../utils/diceShapes'

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
  const CritIcon = theme === 'dark' ? GiBurningSkull : GiAngelWings

  const controls = useAnimationControls()
  useEffect(() => {
    if (!isRevealed && isRolling) {
      const timeout = setTimeout(async () => {
        controls.set({ rotateZ: 0 })
        await controls.start({
          rotateZ: 360 * 2,
          transition: { duration: 1, ease: 'easeIn' as const, repeat: 0 },
        })
        await controls.start({
          rotateZ: 1080 * 2,
          transition: { duration: 1.5, ease: 'linear' as const, repeat: 0 },
        })
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

  const diceValueOffset: Record<number, string> = {
    4: '10px',
    6: '-33px',
    8: '-10px',
    10: '-25px',
    12: '0px',
    20: '4px',
  }

  const diceValueHorizontalOffset: Record<number, string> = {
    4: '0px',
    6: '0px',
    8: '0px',
    10: '-3.5px',
    12: '0px',
    20: '0px',
  }

  return (
    <motion.div
      animate={controls}
      className="relative flex items-center justify-center"
      style={{ width: '80px', height: '80px' }}
    >
      <img
        src={blankDice[diceType]}
        alt={`d${diceType}`}
        style={{
          width: '100%',
          height: '100%',
          filter: 'var(--dice-filter)',
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ paddingTop: diceValueOffset[diceType] }}
      >
        <span
          style={{
            marginTop: diceValueOffset[diceType],
            marginLeft: diceValueHorizontalOffset[diceType],
            fontFamily: 'var(--font-numbers)',
          }}
          className={`text-l font-bold ${isRevealed && isCritical ? 'text-[var(--color-crit)] font-bold' : 'text-[var(--color-dice-text)]'}`}
        >
          {isRevealed ? isCritical ? <CritIcon size={20} /> : value : '?'}
        </span>
      </div>
    </motion.div>
  )
}
