import OrderedMap from 'orderedmap'

export function deepEquals<T>(a: T, b: T): boolean {
  if (a === b) {
    return true
  }

  if (!a || !b) {
    return false
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => deepEquals(x, b[i]))
  }

  if (a instanceof OrderedMap && b instanceof OrderedMap) {
    return a.size === b.size && deepEquals(a.toObject(), b.toObject())
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    return (
      aKeys.length === bKeys.length &&
      aKeys.every((key) => deepEquals(a[key as keyof T], b[key as keyof T]))
    )
  }
  return false
}
