import type { Item, Payer, Payment, PaymentGroup } from '@/interfaces'
import { defineStore } from 'pinia'
import { PaymentTypes } from '@/globals'

interface State {
  items: Item[],
}

interface PaymentsMatrixInterface {
  [itemId: Item['id']]: { [payerId: Payer['id']]: number }
}

export const useItemsStore = defineStore('items', {
  state: (): State => ({
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
      if (!item) {
        return
      }

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
      if (!item) {
        return
      }

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
      this.items.forEach((item: Item) => {
        const newPayment = {
          payerId: payerId,
          isEqualPayer: false,
          quantity: 0,
          percentage: 0
        }

        this._updateItemPaymentGroup(item.id, { payments: [ ...item.paymentGroup.payments, newPayment ] })
      })
    },
    deletePayerFromItems(payerId: Payer['id']) {
      this.items.forEach((item: Item) => {
        // filter out payer id from current payments
        const filteredPayments = item.paymentGroup.payments.filter(
          (payment: Payment) => payment.payerId !== payerId
        )
        this._updateItemPaymentGroup(item.id, { payments: filteredPayments })
      })
    }
  },
  getters: {
    // total price of items
    totalPrice: (state): number => state.items.reduce((a, b) => (a + b['price']), 0),

    // payment matrix for each item's each payer
    paymentsMatrix: (state): PaymentsMatrixInterface => {
      const result: PaymentsMatrixInterface = {}

      state.items.forEach(item => {
        if (!result[item.id]) {
          result[item.id] = {}
        }

        const payments = item.paymentGroup.payments
        const totalPayments: Record<Payer['id'], number> = {}
        switch (item.paymentGroup.type) {
          case PaymentTypes.EQUAL: {
            const payersCount = payments.filter(p => p.isEqualPayer).length
            const pricePerPayer = payersCount > 0 ? item.price / payersCount : 0
            payments.forEach(payment => {
              totalPayments[payment.payerId] = payment.isEqualPayer ? pricePerPayer : 0
            })
            break
          }
          case PaymentTypes.QUANTITY: {
            const pricePerUnit = item.price / item.quantity
            payments.forEach(payment => {
              totalPayments[payment.payerId] = payment.quantity * pricePerUnit
            })
            break
          }
          case PaymentTypes.PERCENTAGE: {
            payments.forEach(payment => {
              totalPayments[payment.payerId] = (payment.percentage / 100) * item.price
            })
            break
          }
        }
        result[item.id] = totalPayments
      })

      return result
    },

    // total of payments made for each item
    itemTotalPayments(): { [itemId: Item['id']]: number } {
      const result: { [itemId: Item['id']]: number } = {}

      for (const itemId in this.paymentsMatrix) {
        result[itemId] = Object.values(this.paymentsMatrix[itemId]).reduce((acc: number, curr: number) => acc + curr, 0)
      }

      return result
    },

    // total of payments made for each payer
    payerTotalPayments(): { [payerId: Payer['id']]: number } {
      const totals: { [payerId: Payer['id']]: number } = {}

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
