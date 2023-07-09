import { isEqual } from 'lodash-es'

export function isJsonEqual<T>(a: T, b: T): boolean {
  return isEqual(normalizeJson(a), normalizeJson(b))
}

function normalizeJson<T>(json: T): T {
  return JSON.parse(JSON.stringify(json)) as T
}
