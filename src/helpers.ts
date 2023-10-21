import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from '@/globals'

export function formatPrice(
  amount: number,
  locale: string = DEFAULT_LOCALE,
  currency: string = DEFAULT_CURRENCY
): string {
  return amount.toLocaleString(
    locale,
    {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
}

export const calculateEqualPayments = (
  totalPrice: number,
  payments: Array<{ payerId: number, isEqualPayer: boolean }>
): Record<number, number> => {
  const result: Record<number, number> = {}
  const payersCount = payments.filter(p => p.isEqualPayer).length
  const pricePerPayer = totalPrice / payersCount
  payments.forEach(payment => {
    result[payment.payerId] = payment.isEqualPayer ? pricePerPayer : 0
  })
  return result
}

export const calculateQuantityPayments = (
  pricePerUnit: number,
  payments: Array<{ payerId: number, quantity: number }>
): Record<number, number> => {
  const result: Record<number, number> = {}
  payments.forEach(payment => {
    result[payment.payerId] = payment.quantity * pricePerUnit
  })
  return result
}

export const calculatePercentagePayments = (
  totalPrice: number,
  payments: Array<{ payerId: number, percentage: number }>
): Record<number, number> => {
  const result: Record<number, number> = {}
  payments.forEach(payment => {
    result[payment.payerId] = (payment.percentage / 100) * totalPrice
  })
  return result
}
