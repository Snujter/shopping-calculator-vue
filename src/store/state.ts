import type { Item, Payer } from '@/interfaces'
import { SHOP_TYPES } from '@/globals'

export interface State {
  items: Item[]
  payers: Payer[]
  deliveryDate: String,
  shopType: SHOP_TYPES,
  itemsImportModalOpen: boolean,
}

const state: State = {
  items: [],
  payers: [],

  // shopping related stuff
  deliveryDate: new Date().toISOString().split('T')[0],
  shopType: SHOP_TYPES.Morrisons,
  itemsImportModalOpen: false
}

export default state
