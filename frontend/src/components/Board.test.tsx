import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import type { DiceType } from '../types'
import Board from './Board'
import { ThemeProvider } from '../context/ThemeProvider'

const defaultProps = {
  rollKey: 0,
  selectedDice: 12 as DiceType,
  numberOfDice: 5,
  status: 'idle' as const,
  result: null,
  onAllRevealed: () => {},
}

const renderBoard = (props = {}) =>
  render(
    <ThemeProvider>
      <Board {...defaultProps} {...props} />
    </ThemeProvider>,
  )

describe('Board', () => {
  it('renders the correct number of dice placeholders', () => {
    renderBoard()
    expect(screen.getAllByAltText('Dice Placeholder d12')).toHaveLength(5)
  })

  it('uses the flex layout for 1-3 dice', () => {
    renderBoard({ numberOfDice: 3 })
    const container = screen.getByTestId('dice-container')
    expect(container).toHaveClass('flex')
  })

  it('uses the correct layout for 5 dice', () => {
    renderBoard()
    const container = screen.getByTestId('dice-container')
    expect(container).toHaveClass('grid')
    expect(container).toHaveClass('grid-cols-2')
  })
})
