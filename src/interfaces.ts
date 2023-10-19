import { PAYMENT_TYPES } from '@/globals'

export interface Payer {
  id: number,
  isEqualPayer: boolean,
  quantity: number,
  percentage: number,
}

export interface Payment {
  type: PAYMENT_TYPES,
  payers: Array<Payer>
}

export interface Item {
  id: number,
  name: string,
  quantity: number,
  price: number,
  payment: Payment,
}
