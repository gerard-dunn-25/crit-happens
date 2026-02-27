export interface RollResult {
  rolls: number[]
  total: number
  dice_type: DiceType
  num_dice: number
  critical_roles: boolean[]
}

type DiceType = 4 | 6 | 8 | 10 | 12 | 20

export interface DiceTypesResponse {
  dice_types: DiceType[]
}

type Status = 'idle' | 'rolling' | 'error'

export type { DiceType, Status }
