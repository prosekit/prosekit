/**
 * @intneral
 */
export type ExtractKey<T, K extends string> = Extract<T, Record<K, any>>[K]
