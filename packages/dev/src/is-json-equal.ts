import { isEqual } from 'lodash-es'

export function isJsonEqual<T>(a: T, b: T): boolean {
  return isEqual(normalizeJson(a), normalizeJson(b))
}

/**
 * Turns an object into a plain JSON object.
 */
function normalizeJson<T>(json: T): T {
  const str = JSON.stringify(json)
  return JSON.parse(str) as T
}
