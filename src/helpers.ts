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
  payers: Array<{ id: number, isPaying: boolean }>
): Record<number, number> => {
  const result: Record<number, number> = {}
  const payersCount = payers.filter(p => p.isPaying).length
  const pricePerPayer = totalPrice / payersCount
  payers.forEach(payer => {
    result[payer.id] = payer.isPaying ? pricePerPayer : 0
  })
  return result
}

export const calculateQuantityPayments = (
  pricePerUnit: number,
  payers: Array<{ id: number, quantity: number }>
): Record<number, number> => {
  const result: Record<number, number> = {}
  payers.forEach(payer => {
    result[payer.id] = payer.quantity * pricePerUnit
  })
  return result
}

export const calculatePercentagePayments = (
  totalPrice: number,
  payers: Array<{ id: number, percentage: number }>
): Record<number, number> => {
  const result: Record<number, number> = {}
  payers.forEach(payer => {
    result[payer.id] = (payer.percentage / 100) * totalPrice
  })
  return result
}
