import type { ObjectEntries } from '../types/object-entries'

export function groupEntries<T extends Record<string, any>>(
  entries: ObjectEntries<T>[],
): GroupedEntries<T> {
  const map: GroupedEntries<T> = {}

  for (const [key, value] of entries) {
    const values = map[key]
    if (!values) {
      map[key] = [value]
    } else {
      values.push(value)
    }
  }

  return map
}

export type GroupedEntries<T extends Record<string, any>> = {
  [K in keyof T]?: T[K][]
}
