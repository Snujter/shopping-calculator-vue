import type { State } from './state'
import type { PAYMENT_TYPES } from '@/globals'
import type { Item, Payer, Payment } from '@/interfaces'
import { SHOP_TYPES } from '@/globals'

export const enum MutationTypes {
  UPDATE_PAYMENT_TYPE = 'UPDATE_PAYMENT_TYPE',
  UPDATE_PAYER_IS_EQUAL = 'UPDATE_PAYER_IS_EQUAL',
  UPDATE_PAYER_QUANTITY = 'UPDATE_PAYER_QUANTITY',
  UPDATE_PAYER_PERCENTAGE = 'UPDATE_PAYER_PERCENTAGE',
  SET_ITEMS = 'SET_ITEMS',
  UPDATE_DELIVERY_DATE = 'UPDATE_DELIVERY_DATE',
  UPDATE_IS_ITEMS_IMPORT_MODAL_OPEN = 'UPDATE_IS_ITEMS_IMPORT_MODAL_OPEN',
  UPDATE_SHOP_TYPE = 'UPDATE_SHOP_TYPE',
  UPDATE_IS_MANAGE_PAYERS_MODAL_OPEN = 'UPDATE_IS_MANAGE_PAYERS_MODAL_OPEN',
  UPDATE_PAYER = 'UPDATE_PAYER',
  ADD_PAYER = 'ADD_PAYER',
  ADD_PAYER_TO_ITEMS = 'ADD_PAYER_TO_ITEMS',
  DELETE_PAYER = 'DELETE_PAYER',
  DELETE_PAYER_FROM_ITEMS = 'DELETE_PAYER_FROM_ITEMS',
}

const mutations = {
  [MutationTypes.UPDATE_PAYMENT_TYPE](state: State, payload: { itemId: Item['id'], value: PAYMENT_TYPES }) {
    const item = state.items.find(item => item.id === payload.itemId)
    if (item) {
      item.paymentGroup.type = payload.value
    }
  },
  [MutationTypes.UPDATE_PAYER_IS_EQUAL](state: State, payload: { itemId: Item['id'], payerId: Payer['id'], value: Payment['isEqualPayer'] }) {
    const item = state.items.find(i => i.id === payload.itemId)
    const payment = item?.paymentGroup.payments.find(p => p.payerId === payload.payerId)
    if (payment) {
      payment.isEqualPayer = payload.value
    }
  },
  [MutationTypes.UPDATE_PAYER_QUANTITY](state: State, payload: { itemId: Item['id'], payerId: Payer['id'], value: Payment['quantity'] }) {
    const item = state.items.find(i => i.id === payload.itemId)
    const payment = item?.paymentGroup.payments.find(p => p.payerId === payload.payerId)
    if (payment) {
      payment.quantity = payload.value
    }
  },
  [MutationTypes.UPDATE_PAYER_PERCENTAGE](state: State, payload: { itemId: Item['id'], payerId: Payer['id'], value: Payment['percentage'] }) {
    const item = state.items.find(i => i.id === payload.itemId)
    const payment = item?.paymentGroup.payments.find(p => p.payerId === payload.payerId)
    if (payment) {
      payment.percentage = payload.value
    }
  },
  [MutationTypes.SET_ITEMS](state: State, newValue: Item[]) {
    state.items = newValue
  },
  [MutationTypes.UPDATE_DELIVERY_DATE](state: State, newValue: string) {
    state.deliveryDate = newValue
  },
  [MutationTypes.UPDATE_IS_ITEMS_IMPORT_MODAL_OPEN](state: State, newValue: boolean) {
    state.itemsImportModalOpen = newValue
  },
  [MutationTypes.UPDATE_IS_MANAGE_PAYERS_MODAL_OPEN](state: State, newValue: boolean) {
    state.managePayersModalOpen = newValue
  },
  [MutationTypes.UPDATE_SHOP_TYPE](state: State, newValue: SHOP_TYPES) {
    state.shopType = newValue
  },
  [MutationTypes.UPDATE_PAYER](state: State, payload: { id: Payer['id'], name?: Payer['name'] }) {
    const payer = state.payers.find(p => p.id === payload.id)
    if (payer) {
      payer.name = payload.name
    }
  },
  [MutationTypes.ADD_PAYER](state, payload) {
    state.payers.push(payload)
  },
  [MutationTypes.ADD_PAYER_TO_ITEMS](state, newPayer: Payer) {
    state.items.forEach(item => {
      item.paymentGroup.payments.push({
        payerId: newPayer.id,
        isEqualPayer: false,
        quantity: 0,
        percentage: 0
      })
    })
  },
  [MutationTypes.DELETE_PAYER](state, payerId) {
    state.payers = state.payers.filter(p => p.id !== payerId)
  },
  [MutationTypes.DELETE_PAYER_FROM_ITEMS](state, payerId) {
    state.items.forEach(item => {
      item.paymentGroup.payments = item.paymentGroup.payments.filter((payment: Payment) => payment.payerId !== payerId)
    })
  }
}

export default mutations
