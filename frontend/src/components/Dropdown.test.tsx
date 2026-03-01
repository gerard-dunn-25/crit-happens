import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import type { DiceType } from '../types'
import Dropdown from './Dropdown'
import { ThemeProvider } from '../context/ThemeProvider'

const defaultProps = {
  availableDiceTypes: [4, 6, 8, 10, 12, 20] as DiceType[],
  selectedDice: 20 as DiceType,
  numberOfDice: 1,
  onDiceTypeChange: vi.fn(),
  onNumberOfDiceChange: vi.fn(),
  onOpenChange: vi.fn(),
}

const renderDropdown = (props = {}) =>
  render(
    <ThemeProvider>
      <Dropdown {...defaultProps} {...props} />
    </ThemeProvider>,
  )

describe('Dropdown', () => {
  it('renders the dropdown icon', () => {
    renderDropdown()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens the panel on click', async () => {
    renderDropdown()
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('d4')).toBeInTheDocument()
  })

  it('calls onDiceTypeChange when a dice type is selected', async () => {
    const onDiceTypeChange = vi.fn()
    renderDropdown({ onDiceTypeChange })
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByAltText('d6'))
    expect(onDiceTypeChange).toHaveBeenCalledWith(6)
  })

  it('calls onNumberOfDiceChange when + is clicked', async () => {
    const onNumberOfDiceChange = vi.fn()
    renderDropdown({ onNumberOfDiceChange })
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByText('+'))
    expect(onNumberOfDiceChange).toHaveBeenCalledWith(2)
  })

  it('calls onNumberOfDiceChange when - is clicked', async () => {
    const onNumberOfDiceChange = vi.fn()
    renderDropdown({ onNumberOfDiceChange, numberOfDice: 3 })
    await userEvent.click(screen.getByRole('button'))
    await userEvent.click(screen.getByText('-'))
    expect(onNumberOfDiceChange).toHaveBeenCalledWith(2)
  })
})
