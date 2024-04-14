import type { Item, Payer, Payment, PaymentGroup } from '@/interfaces'
import { defineStore } from 'pinia'
import { PAYMENT_TYPES } from '@/globals'
import { calculateEqualPayments, calculatePercentagePayments, calculateQuantityPayments } from '@/helpers'

export interface ItemsStateInterface {
  items: Item[]
}

export interface PaymentsMatrixInterface {
  [itemId: Item['id']]: { [payerId: Payer['id']]: number }
}

export const useItemsStore = defineStore('items', {
  state: (): ItemsStateInterface => ({
    items: []
  }),
  actions: {
    // sets new items
    setItems(newItems: Item[]) {
      this.items = [...newItems]
    },
    // update a single item
    updateItem(itemId: Item['id'], payload: Partial<Item>) {
      this.items = this.items.map((item: Item) => (
        item.id === itemId ? { ...item, ...payload } : item
      ))
    },
    // updates a payment group inside an item
    _updateItemPaymentGroup(itemId: Item['id'], payload: Partial<PaymentGroup>) {
      const item = this.items.find((item: Item) => item.id === itemId)
      const newPaymentGroup = {
        paymentGroup: {
          ...item.paymentGroup,
          ...payload
        }
      }

      this.updateItem(itemId, newPaymentGroup)
    },
    // updates a payment inside a payment group
    _setPaymentInGroup(itemId: Item['id'], payerId: Payer['id'], updatedPayment: Partial<Payment>) {
      const item = this.items.find((item: Item) => item.id === itemId)
      const newPayments = item.paymentGroup.payments.map((payment: Payment) => (
        payment.payerId === payerId ? { ...payment, ...updatedPayment } : payment
      ))
      this._updateItemPaymentGroup(itemId, { payments: newPayments })
    },
    // updates the payment type for an item
    setPaymentType(itemId: Item['id'], newType: PaymentGroup['type']) {
      this._updateItemPaymentGroup(itemId, { type: newType })
    },
    // updates equal payment option for an item payment
    setPaymentIsEqualPayer(itemId: Item['id'], payerId: Payer['id'], newValue: Payment['isEqualPayer']) {
      this._setPaymentInGroup(itemId, payerId, { isEqualPayer: newValue })
    },
    // updates quantity option for an item payment
    setPaymentQuantity(itemId: Item['id'], payerId: Payer['id'], newValue: Payment['quantity']) {
      this._setPaymentInGroup(itemId, payerId, { quantity: newValue })
    },
    // updates percentage option for an item payment
    setPaymentPercentage(itemId: Item['id'], payerId: Payer['id'], newValue: Payment['percentage']) {
      this._setPaymentInGroup(itemId, payerId, { percentage: newValue })
    },
    addPayerToItems(payerId: Payer['id']) {
      this.items = this.items.map((item: Item) => {
        const newPayment = {
          payerId: payerId,
          isEqualPayer: false,
          quantity: 0,
          percentage: 0
        }

        return {
          ...item,
          paymentGroup: {
            ...item.paymentGroup,
            payments: [...item.paymentGroup.payments, newPayment]
          }
        }
      })
    },
    deletePayerFromItems(payerId: Payer['id']) {
      this.items.forEach((item: Item) => {
        item.paymentGroup.payments = item.paymentGroup.payments.filter((payment: Payment) => payment.payerId !== payerId)
      })
    }
  },
  getters: {
    // total price of items
    totalPrice: (state) => state.items.reduce((a, b) => (a + b['price']), 0),

    // payment matrix for each item's each payer
    paymentsMatrix: (state): PaymentsMatrixInterface => {
      const result: PaymentsMatrixInterface = {}

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
    itemTotalPayments(): { [itemId: Item['id']]: number } {
      const result: { [itemId: Item['id']]: number } = {}

      for (const itemId in this.paymentsMatrix) {
        result[itemId] = Object.values(this.paymentsMatrix[itemId]).reduce((acc: number, curr: PaymentsMatrixInterface[Item['id']]) => acc + curr, 0)
      }

      return result
    },

    // total of payments made for each payer
    payerTotalPayments(): { [payerId: Payer['id']]: number } {
      const totals = {}

      this.items.forEach(item => {
        const itemPayments = item.paymentGroup.payments

        itemPayments.forEach(payment => {
          const paymentAmount = this.paymentsMatrix[item.id][payment.payerId]

          if (!totals[payment.payerId]) {
            totals[payment.payerId] = 0
          }

          totals[payment.payerId] += paymentAmount
        })
      })

      return totals
    }
  }
})
