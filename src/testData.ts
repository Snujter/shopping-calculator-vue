import { PAYMENT_TYPES } from '@/globals'

export const TEST_ITEMS = [
  {
    id: 1,
    name: 'Some long ass product name man',
    quantity: 2,
    price: 1234567.89,
    paymentGroup: {
      type: PAYMENT_TYPES.Equal,
      payments: [
        { payerId: 1, isEqualPayer: true, quantity: 0, percentage: 0 },
        { payerId: 2, isEqualPayer: true, quantity: 0, percentage: 0 },
        { payerId: 3, isEqualPayer: true, quantity: 0, percentage: 0 }
      ]
    }
  },
  {
    id: 2,
    name: 'quantity test baby',
    quantity: 3,
    price: 150,
    paymentGroup: {
      type: PAYMENT_TYPES.Quantity,
      payments: [
        { payerId: 1, isEqualPayer: false, quantity: 0, percentage: 0 },
        { payerId: 2, isEqualPayer: true, quantity: 0, percentage: 0 },
        { payerId: 3, isEqualPayer: true, quantity: 0, percentage: 0 }
      ]
    }
  },
  {
    id: 2,
    name: 'percentage test with another really super duper long test name please wrap in more than 2 lines I beg of you',
    quantity: 4,
    price: 200,
    paymentGroup: {
      type: PAYMENT_TYPES.Percentage,
      payments: [
        { payerId: 1, isEqualPayer: false, quantity: 0, percentage: 0 },
        { payerId: 2, isEqualPayer: true, quantity: 0, percentage: 0 },
        { payerId: 3, isEqualPayer: true, quantity: 0, percentage: 0 }
      ]
    }
  }
]

export const TEST_PAYERS = [
  { id: 1, name: 'Drak\'nuyek, Eater of Worlds' },
  { id: 2, name: 'Gorlok the Destroyer' },
  { id: 3, name: 'John' }
]
