import type { State } from './state'
import type { Item, Payer } from '@/interfaces'
import { PAYMENT_TYPES } from '@/globals'
import { calculateEqualPayments, calculatePercentagePayments, calculateQuantityPayments } from '@/helpers'

const getters = {
  // total price of items
  totalPrice: (state: State) => state.items.reduce((a, b) => (a + b['price']), 0),

  // payment matrix for each item's each payer
  paymentsMatrix: (state: State) => {
    const result: { [itemId: Item['id']]: { [payerId: Payer['id']]: number } } = {}

    state.items.forEach(item => {
      if (!result[item.id]) {
        result[item.id] = {}
      }

      switch (item.paymentGroup.type) {
        case PAYMENT_TYPES.Equal:
          result[item.id] = calculateEqualPayments(item.price, item.paymentGroup.payments)
          break
        case PAYMENT_TYPES.Quantity:
          result[item.id] = calculateQuantityPayments(item.price / item.quantity, item.paymentGroup.payments)
          break
        case PAYMENT_TYPES.Percentage:
          result[item.id] = calculatePercentagePayments(item.price, item.paymentGroup.payments)
          break
      }
    })

    return result
  },

  // total of payments made for each item
  itemTotalPayments: (state: State, getters) => {
    const result: { [itemId: Item['id']]: number } = {}

    for (const itemId in getters.paymentsMatrix) {
      result[itemId] = Object.values(getters.paymentsMatrix[itemId]).reduce((acc, curr) => acc + curr, 0)
    }

    return result
  },

  // total of payments made for each payer
  payerTotalPayments: (state: State, getters) => {
    const result: { [payerId: number]: number } = {}

    state.payers.forEach(payer => {
      let payerTotal = 0

      for (const itemId in getters.paymentsMatrix) {
        if (getters.paymentsMatrix[itemId][payer.id]) {
          payerTotal += getters.paymentsMatrix[itemId][payer.id]
        }
      }

      result[payer.id] = payerTotal
    })

    return result
  },

  paymentForItemAndUser: (state: State, getters) => (itemId, payerId) => {
    const itemPayments = getters.paymentsMatrix[itemId]

    if (itemPayments) {
      return itemPayments[payerId] || 0
    }

    return 0
  }
}

export default getters
