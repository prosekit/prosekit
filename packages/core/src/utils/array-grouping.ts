import type { ObjectEntries } from '../types/object-entries'

function groupByPolyfill(
  items: Iterable<unknown>,
  keySelector: (item: unknown, index: number) => string,
): Record<string, unknown[]> {
  const result: Record<string, unknown[]> = {}
  let index = 0
  for (const item of items) {
    const key = keySelector(item, index)
    index++
    const values = (result[key] ||= [])
    values.push(item)
  }
  return result
}

export const groupBy: <K extends PropertyKey, T>(
  items: Iterable<T>,
  keySelector: (item: T, index: number) => K,
) => Partial<Record<K, T[]>> = Object.groupBy || groupByPolyfill

export function groupEntries<T extends Record<string, any>>(
  entries: ObjectEntries<T>[],
): GroupedEntries<T> {
  return groupBy(entries, ([key]) => key) as GroupedEntries<T>
}

export type GroupedEntries<T extends Record<string, any>> = {
  [K in keyof T]?: T[K][]
}
