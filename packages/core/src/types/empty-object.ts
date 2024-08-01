import type { EmptyObject as _EmptyObject } from 'type-fest'

/**
 * Represents a strictly empty plain object, the `{}` value.
 *
 * When you annotate something as the type `{}`, it can be anything except
 * `null` and `undefined`. This means that you cannot use `{}` to represent an
 * empty plain object.
 *
 * @internal
 */
export type EmptyObject = _EmptyObject
