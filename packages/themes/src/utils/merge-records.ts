type MergeObject<T, P> =
  T extends Record<string, string>
    ? P extends Record<string, string>
      ? {
          [K in keyof T | keyof P]: K extends keyof T
            ? T[K]
            : K extends keyof P
              ? P[K]
              : never
        }
      : never
    : never

type MergeObjects<T extends Record<string, string>[]> = T['length'] extends 1
  ? T[0]
  : T extends [
        infer A extends Record<string, string>,
        ...infer B extends Record<string, string>[],
      ]
    ? MergeObject<A, MergeObjects<B>>
    : never

export function mergeRecords<T extends Record<string, string>[]>(
  ...records: T
): MergeObjects<T> {
  return Object.fromEntries(
    (records as Record<string, string>[]).flatMap(Object.entries),
  ) as MergeObjects<T>
}
