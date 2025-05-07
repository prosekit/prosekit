export function maybeUndefined<T>(val: T): T | undefined {
  if (!val) {
    return undefined
  }

  if (Array.isArray(val) && val.length === 0) {
    return undefined
  }

  if (typeof val === 'object' && Object.keys(val).length === 0) {
    return undefined
  }

  return val
}
