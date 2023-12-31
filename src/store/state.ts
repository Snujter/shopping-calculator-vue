import type { Item, Payer } from '@/interfaces'
import { SHOP_TYPES } from '@/globals'

export interface State {
  items: Item[]
  payers: Payer[]
  deliveryDate: String,
  shopType: SHOP_TYPES,
  itemsImportModalOpen: boolean,
  managePayersModalOpen: boolean,
}

// get stored payers from localstorage
const storedPayers = localStorage.getItem('payers')

const state: State = {
  items: [],
  payers: storedPayers ? JSON.parse(storedPayers) : [],

  // shopping related stuff
  deliveryDate: new Date().toISOString().split('T')[0],
  shopType: SHOP_TYPES.Morrisons,
  itemsImportModalOpen: false,
  managePayersModalOpen: false
}

export default state
