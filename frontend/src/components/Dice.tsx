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
  diceSize,
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

  const sizeRatio = diceSize / 80

  const diceValueOffset: Record<number, number> = {
    4: 10 * sizeRatio,
    6: -33 * sizeRatio,
    8: -10 * sizeRatio,
    10: -25 * sizeRatio,
    12: 0,
    20: 4 * sizeRatio,
  }

  const diceValueHorizontalOffset: Record<number, number> = {
    4: 0,
    6: 0,
    8: 0,
    10: -3.5 * sizeRatio,
    12: 0,
    20: 0,
  }

  return (
    <div
      style={{
        filter:
          isRevealed && isCritical
            ? 'drop-shadow(0 0 8px var(--color-crit)) drop-shadow(0 0 16px var(--color-crit))'
            : 'none',
        transition: 'filter 0.3s ease-in',
      }}
    >
      <motion.div
        animate={controls}
        className="relative flex items-center justify-center"
        style={{
          width: `${diceSize}px`,
          height: `${diceSize}px`,
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      >
        <img
          src={blankDice[diceType]}
          alt={`Dice Placeholder d${diceType}`}
          style={{
            width: '100%',
            height: '100%',
            filter: 'var(--dice-filter)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            style={{
              marginTop: `${diceValueOffset[diceType]}px`,
              marginLeft: `${diceValueHorizontalOffset[diceType]}px`,
              fontFamily: 'var(--font-numbers)',
              fontSize: `${14 * sizeRatio}px`,
            }}
            className="font-bold text-[var(--color-dice-text)]"
          >
            {isRevealed ? (
              isCritical ? (
                <span data-testid="crit-icon">
                  <CritIcon size={20 * sizeRatio} />
                </span>
              ) : (
                value
              )
            ) : (
              '?'
            )}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
