import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import type { DiceType } from '../types'
import Dice from './Dice'
import { ThemeProvider } from '../context/ThemeProvider'

const defaultProps = {
  rollKey: 0,
  diceType: 20 as DiceType,
  spinDelay: 0,
  value: 15,
  isRolling: false,
  isCritical: false,
  isRevealed: false,
}

const renderDice = (props = {}) =>
  render(
    <ThemeProvider>
      <Dice {...defaultProps} {...props} />
    </ThemeProvider>,
  )

describe('Dice', () => {
  it('displays ? when not revealed', () => {
    renderDice({ isRevealed: false })
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('displays the correct value when revealed', () => {
    renderDice({ isRevealed: true, value: 15 })
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('displays crit icon with correct colour when critical', () => {
    renderDice({ isRevealed: true, value: 20, isCritical: true })
    expect(screen.queryByText('20')).not.toBeInTheDocument()
    const critIcon = screen.getByTestId('crit-icon')
    expect(critIcon.parentElement).toHaveClass('text-[var(--color-crit)]')
  })
})
