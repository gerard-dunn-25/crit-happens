import type { DiceType, RollResult, Status } from './api'

type DropdownProps = {
  availableDiceTypes: DiceType[]
  selectedDice: DiceType
  numberOfDice: number
  onDiceTypeChange: (dice: DiceType) => void
  onNumberOfDiceChange: (count: number) => void
}

type BoardProps = {
  selectedDice: DiceType
  numberOfDice: number
  result: RollResult | null
  status: Status
}

type DiceProps = {
  diceType: DiceType
  value: number
  isCritical: boolean
}

type ResultsProps = {
  result: RollResult | null
  status: Status
}

export type { DropdownProps, BoardProps, DiceProps, ResultsProps }
