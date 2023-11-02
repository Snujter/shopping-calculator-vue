import type { Item, Payer } from '@/interfaces'

export interface State {
  items: Item[]
  payers: Payer[]
  deliveryDate: String
}

const state: State = {
  items: [],
  payers: [],
  deliveryDate: ""
}

export default state
