/**
 * Alias to make only specific fields of a type available.
 * Usage: PartialFields<SomeType, 'fieldNumberOne', 'someOtherField'>
 */
type PartialFields<T, K extends keyof T> =
  Partial<Pick<T, K>> & Omit<T, K>
