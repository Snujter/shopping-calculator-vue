import { PaymentTypes } from '@/globals'

export interface Payer {
  id: number,
  name: string
}

export interface Payment {
  payerId: Payer['id'],
  isEqualPayer: boolean,
  quantity: number,
  percentage: number
}

export interface PaymentGroup {
  type: PaymentTypes,
  payments: Array<Payment>
}

export interface Item {
  id: number,
  name: string,
  quantity: number,
  price: number,
  paymentGroup: PaymentGroup
}
