import type { ObjectEntries } from '@ocavue/utils'

export function groupEntries<T extends Record<string, any>>(
  entries: ObjectEntries<T>[],
): { [K in keyof T]?: T[K][] } {
  const result: { [K in keyof T]?: T[K][] } = {}
  for (const [key, value] of entries) {
    const values = (result[key] ||= [])
    values.push(value)
  }
  return result
}
