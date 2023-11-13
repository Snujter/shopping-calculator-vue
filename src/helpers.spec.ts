import { describe, it, assert, expect, vi } from 'vitest'
import {
  formatPrice,
  calculateEqualPayments,
  calculateQuantityPayments,
  calculatePercentagePayments,
  convertToCSV, downloadCSV
} from '@/helpers'

describe('formatPrice', () => {
  it('should format price according to locale', async () => {
    const formattedPriceDefaultLocale = formatPrice(1500) // default locale
    const formattedPriceGermanLocale = formatPrice(1500, 'de-DE', 'EUR') // German locale

    assert.equal(formattedPriceDefaultLocale, '£1,500.00', `Expected "£1,500.00" but got "${formattedPriceDefaultLocale}"`)
    assert.equal(formattedPriceGermanLocale, '1.500,00 €', `Expected "1.500,00 €" but got "${formattedPriceGermanLocale}"`)
  })
})

describe('Payments Calculation', () => {
  // calculateEqualPayments
  it('should evenly distribute payments among all paying members', () => {
    const totalAmount = 100
    const payers = [
      { payerId: 1, isEqualPayer: true },
      { payerId: 2, isEqualPayer: true },
      { payerId: 3, isEqualPayer: false }
    ]
    const expectedOutput = { 1: 50, 2: 50, 3: 0 }
    expect(calculateEqualPayments(totalAmount, payers)).toEqual(expectedOutput)
  })

  // calculateQuantityPayments
  it('should distribute payments according to the specified amounts for each payer', () => {
    const pricerPerUnit = 20
    const payers = [
      { payerId: 1, quantity: 3 },
      { payerId: 2, quantity: 1 },
      { payerId: 3, quantity: 1 }
    ]
    const expectedOutput = { 1: 60, 2: 20, 3: 20 }
    expect(calculateQuantityPayments(pricerPerUnit, payers)).toEqual(expectedOutput)
  })

  // calculatePercentagePayments
  it('should distribute payments according to the specified percentage for each payer', () => {
    const totalAmount = 1000
    const payers = [
      { payerId: 1, percentage: 70 },
      { payerId: 2, percentage: 20 },
      { payerId: 3, percentage: 10 }
    ]
    const expectedOutput = { 1: 700, 2: 200, 3: 100 }
    expect(calculatePercentagePayments(totalAmount, payers)).toEqual(expectedOutput)
  })
})

describe('convertToCSV', () => {
  it('converts an array of objects to a CSV string using default delimiter', () => {
    const objArray = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ]
    const expectedResult = `"Alice","30"\r\n"Bob","25"\r\n`
    expect(convertToCSV(objArray)).toBe(expectedResult)
  })

  it('converts an array of objects to a CSV string using a custom delimiter', () => {
    const objArray = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ]
    const delimiter = ';'
    const expectedResult = `"Alice";"30"\r\n"Bob";"25"\r\n`
    expect(convertToCSV(objArray, delimiter)).toBe(expectedResult)
  })

  it('handles an empty array', () => {
    const objArray: Object = []
    const expectedResult: string = ''
    expect(convertToCSV(objArray)).toBe(expectedResult)
  })

  it('throws an error for invalid input', () => {
    const invalidInput = 'not a valid JSON'
    expect(() => convertToCSV(invalidInput)).toThrow()
  })
})
