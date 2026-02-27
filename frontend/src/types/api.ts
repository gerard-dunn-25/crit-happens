type DiceType = 4 | 6 | 8 | 10 | 12 | 20

type Status = 'idle' | 'rolling' | 'error'

export interface RollResult {
  dice_type: DiceType
  num_dice: number
  rolls: number[]
  critical_rolls: boolean[]
  total: number
}

export interface DiceTypesResponse {
  dice_types: DiceType[]
}

export type { DiceType, Status }
