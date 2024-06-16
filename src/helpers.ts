/**
 * Helper functions for various tasks like formatting currency, downloading CSV etc.
 */
import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from '@/globals'

// formats number to currency
export const formatPrice = (
  amount: number,
  locale: string = DEFAULT_LOCALE,
  currency: string = DEFAULT_CURRENCY
): string => {
  return amount.toLocaleString(
    locale,
    {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
}

// converts an array or object to CSV
export const convertToCSV = (objArray: any, delimiter: any = ','): string => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
  let str = ''
  const headers = Object.keys(array[0] || [])
  // str += headers.join(delimiter) + '\r\n'
  for (let i = 0; i < array.length; i++) {
    let line = ''
    for (let j = 0; j < headers.length; j++) {
      if (line !== '') line += delimiter
      line += `"${array[i][headers[j]]}"`
    }
    str += line + '\r\n'
  }
  return str
}

// downloads a CSV
export const downloadCSV = (data: string, filename: string) => {
  const blob = new Blob([data], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = `${filename}.csv`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}
