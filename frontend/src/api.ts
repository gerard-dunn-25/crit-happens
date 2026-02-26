import type { RollResult, DiceType, DiceTypesResponse } from './types'

const API_BASE_URL = 'http://localhost:8000'

export async function rollDice(request: {
  diceType: DiceType
  numberOfDice: number
}): Promise<RollResult> {
  const response = await fetch(`${API_BASE_URL}/roll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dice_type: request.diceType,
      num_dice: request.numberOfDice,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error rolling dice: ${response.statusText}`)
  }

  return response.json()
}

export async function getDiceTypes(): Promise<DiceTypesResponse> {
  const response = await fetch(`${API_BASE_URL}/dice-types`)

  if (!response.ok) {
    throw new Error(`Error fetching dice types: ${response.statusText}`)
  }

  return response.json()
}
