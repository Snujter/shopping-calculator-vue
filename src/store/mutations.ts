import type { State } from './state'
import type { PAYMENT_TYPES } from '@/globals'
import type { Item, Payer, Payment } from '@/interfaces'

export const enum MutationTypes {
  UPDATE_PAYMENT_TYPE = 'UPDATE_PAYMENT_TYPE',
  UPDATE_PAYER_IS_EQUAL = 'UPDATE_PAYER_IS_EQUAL',
  UPDATE_PAYER_QUANTITY = 'UPDATE_PAYER_QUANTITY',
  UPDATE_PAYER_PERCENTAGE = 'UPDATE_PAYER_PERCENTAGE',
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
  }
}

export default mutations
