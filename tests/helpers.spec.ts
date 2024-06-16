import { describe, it, assert, expect } from 'vitest'
import {
  formatPrice,
  convertToCSV
} from '../src/helpers'

describe('formatPrice', () => {
  it('should format price according to locale', async () => {
    const formattedPriceDefaultLocale = formatPrice(1500) // default locale
    const formattedPriceGermanLocale = formatPrice(1500, 'de-DE', 'EUR') // German locale

    assert.equal(formattedPriceDefaultLocale, '£1,500.00', `Expected "£1,500.00" but got "${formattedPriceDefaultLocale}"`)
    assert.equal(formattedPriceGermanLocale, '1.500,00 €', `Expected "1.500,00 €" but got "${formattedPriceGermanLocale}"`)
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
