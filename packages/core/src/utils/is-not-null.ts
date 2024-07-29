/**
 * @deprecated Use `isNotNullish` instead.
 */
export function isNotNull<T>(value: T | null | undefined): value is T {
  return value != null
}
