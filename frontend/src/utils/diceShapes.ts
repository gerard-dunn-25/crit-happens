import type { DiceType } from '../types'

import d4 from '../assets/icons/numbered-dice/d4.svg'
import d6 from '../assets/icons/numbered-dice/d6.svg'
import d8 from '../assets/icons/numbered-dice/d8.svg'
import d10 from '../assets/icons/numbered-dice/d10.svg'
import d12 from '../assets/icons/numbered-dice/d12.svg'
import d20 from '../assets/icons/numbered-dice/d20.svg'

import d4Blank from '../assets/icons/blank-dice/d4-blank.svg'
import d6Blank from '../assets/icons/blank-dice/d6-blank.svg'
import d8Blank from '../assets/icons/blank-dice/d8-blank.svg'
import d10Blank from '../assets/icons/blank-dice/d10-blank.svg'
import d12Blank from '../assets/icons/blank-dice/d12-blank.svg'
import d20Blank from '../assets/icons/blank-dice/d20-blank.svg'

export const numberedDice: Record<DiceType, string> = {
  4: d4,
  6: d6,
  8: d8,
  10: d10,
  12: d12,
  20: d20,
}

export const blankDice: Record<DiceType, string> = {
  4: d4Blank,
  6: d6Blank,
  8: d8Blank,
  10: d10Blank,
  12: d12Blank,
  20: d20Blank,
}
