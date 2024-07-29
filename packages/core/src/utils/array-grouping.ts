import type { ObjectEntries } from '../types/object-entries'

export function groupBy<K extends PropertyKey, T>(
  items: Iterable<T>,
  keySelector: (item: T) => K,
): Partial<Record<K, T[]>> {
  const result: Partial<Record<K, T[]>> = {}
  for (const item of items) {
    const key = keySelector(item)
    const values = (result[key] ||= [])
    values.push(item)
  }
  return result
}

export function groupEntries<T extends Record<string, any>>(
  entries: ObjectEntries<T>[],
): GroupedEntries<T> {
  const result: GroupedEntries<T> = {}
  for (const [key, value] of entries) {
    const values = (result[key] ||= [])
    values.push(value)
  }
  return result
}

export type GroupedEntries<T extends Record<string, any>> = {
  [K in keyof T]?: T[K][]
}
