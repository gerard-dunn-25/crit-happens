import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Results from './Results'

import type { DiceType, RollResult } from '../types'

describe('Results', () => {
  it('renders nothing when result is null', () => {
    render(<Results result={null} />)
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })

  it('renders the total when result is provided', () => {
    const mockResult = {
      rolls: [5, 10],
      critical_rolls: [false, false],
      total: 15,
      dice_type: 20 as DiceType,
      num_dice: 2,
    }
    render(<Results result={mockResult} />)
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('renders crit rolls in crimson', () => {
  const mockResult: RollResult = {
    rolls: [5, 20],
    critical_rolls: [false, true],
    total: 25,
    dice_type: 20 as DiceType,
    num_dice: 2,
  }
  render(<Results result={mockResult} />)
  const critRoll = screen.getByText('20')
  expect(critRoll).toHaveClass('text-[var(--color-crit)]')
})
})
