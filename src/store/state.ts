import type { Item, Payer } from '@/interfaces'

export interface State {
  items: Item[]
  payers: Payer[]
  deliveryDate: String
}

const state: State = {
  items: [],
  payers: [],
  deliveryDate: new Date().toISOString().split('T')[0]
}

export default state
