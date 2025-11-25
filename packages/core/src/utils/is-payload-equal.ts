import { isDeepEqual } from '@ocavue/utils'
import OrderedMap from 'orderedmap'

export function isPayloadEqual<T>(a: T, b: T): boolean {
  if (a === b) {
    return true
  }

  if (a instanceof OrderedMap && b instanceof OrderedMap) {
    return a.size === b.size && isPayloadEqual(a.toObject(), b.toObject())
  }

  return isDeepEqual(a, b)
}
