import type { DiceType, RollResult, Status } from './api'

type DropdownProps = {
  availableDiceTypes: DiceType[]
  selectedDice: DiceType
  numberOfDice: number
  onDiceTypeChange: (dice: DiceType) => void
  onNumberOfDiceChange: (count: number) => void
}

type BoardProps = {
  rollKey: number
  selectedDice: DiceType
  numberOfDice: number
  result: RollResult | null
  status: Status
  onAllRevealed: () => void
}

type DiceProps = {
  theme: 'dark' | 'light'
  rollKey: number
  diceType: DiceType
  value: number
  isCritical: boolean
  isRolling: boolean
  spinDelay: number
  isRevealed: boolean
}

type ResultsProps = {
  result: RollResult | null
}

export type { DropdownProps, BoardProps, DiceProps, ResultsProps }
