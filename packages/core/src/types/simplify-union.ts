import { Simplify, UnionToIntersection } from 'type-fest'

/**
 * @intneral
 */
export type SimplifyUnion<T> = Simplify<UnionToIntersection<T>>
