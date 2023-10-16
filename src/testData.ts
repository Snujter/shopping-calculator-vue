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
        { id: 1, isPaying: true, quantity: 0, percentage: 0 },
        { id: 2, isPaying: true, quantity: 0, percentage: 0 },
        { id: 3, isPaying: true, quantity: 0, percentage: 0 }
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
        { id: 1, isPaying: false, quantity: 0, percentage: 0 },
        { id: 2, isPaying: true, quantity: 0, percentage: 0 },
        { id: 3, isPaying: true, quantity: 0, percentage: 0 }
      ]
    }
  }
]

export const TEST_PAYERS = [
  { id: 1, name: 'Drak\'nuyek, Eater of Worlds' },
  { id: 2, name: 'Gorlok the Destroyer' },
  { id: 3, name: 'John' }
]
