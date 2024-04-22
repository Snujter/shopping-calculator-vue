export const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE || 'en-GB'
export const DEFAULT_CURRENCY = import.meta.env.VITE_DEFAULT_CURRENCY || 'GBP'

export enum PaymentTypes {
  EQUAL = 1,
  QUANTITY,
  PERCENTAGE
}

export enum Alignment {
  TOP = 1,
  RIGHT,
  BOTTOM,
  LEFT,
}

export enum ShopTypes {
  MORRISONS = 1,
}
