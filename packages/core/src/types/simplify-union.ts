import type { Simplify, UnionToIntersection } from 'type-fest'

/**
 * @internal
 */
export type SimplifyUnion<T> = Simplify<
  UnionToIntersection<T extends undefined ? never : T>
>
