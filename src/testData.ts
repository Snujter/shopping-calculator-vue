import { PAYMENT_TYPES } from '@/globals'

export const TEST_ITEMS = [
  {
    id: 1,
    name: 'Some long ass product name man',
    quantity: 2,
    price: 1234567.89,
    payment: {
      type: PAYMENT_TYPES.Equal,
      payers: [
        { id: 1, isEqualPayer: true, quantity: 0, percentage: 0 },
        { id: 2, isEqualPayer: true, quantity: 0, percentage: 0 },
        { id: 3, isEqualPayer: true, quantity: 0, percentage: 0 }
      ]
    }
  },
  {
    id: 2,
    name: 'test',
    quantity: 2,
    price: 150,
    payment: {
      type: PAYMENT_TYPES.Equal,
      payers: [
        { id: 1, isEqualPayer: false, quantity: 0, percentage: 0 },
        { id: 2, isEqualPayer: true, quantity: 0, percentage: 0 },
        { id: 3, isEqualPayer: true, quantity: 0, percentage: 0 }
      ]
    }
  }
]

export const TEST_PAYERS = [
  { id: 1, name: 'Drak\'nuyek, Eater of Worlds' },
  { id: 2, name: 'Gorlok the Destroyer' },
  { id: 3, name: 'John' }
]
