export const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE || 'en-US'
export const DEFAULT_CURRENCY = import.meta.env.VITE_DEFAULT_CURRENCY || 'USD'

export enum PAYMENT_TYPES {
  Equal = 1,
  Quantity,
  Percentage
}

export enum ALIGNMENT {
  Top = 1,
  Right = 2,
  Bottom = 3,
  Left = 4,
}
