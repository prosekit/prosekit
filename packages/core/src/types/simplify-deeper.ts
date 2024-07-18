import type { Simplify } from 'type-fest'

/**
 * @internal
 */
export type SimplifyDeeper<T> = { [KeyType in keyof T]: Simplify<T[KeyType]> }
