export function objectEqual<T>(a: T, b: T): boolean {
  if (a === b) {
    return true
  }
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  }
  if (a === null || b === null) {
    return false
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    return false
  }
  const aKeys = Object.keys(a) as (keyof T)[]
  const bKeys = Object.keys(b) as (keyof T)[]
  if (aKeys.length !== bKeys.length) {
    return false
  }
  for (const key of aKeys) {
    if (!bKeys.includes(key)) {
      return false
    }
    if (!objectEqual(a[key], b[key])) {
      return false
    }
  }
  return true
}
