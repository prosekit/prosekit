/**
 * @internal
 *
 * @example
 *
 * ```
 * type MyObject = { a: 1; b: 'B' }
 * type MyEntries = ObjectEntries<MyObject>
 * //   ^ ["a", 1] | ["b", "B"]
 */
export type ObjectEntries<T extends Record<string, any>> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]
