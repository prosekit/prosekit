import type { MaybeAccessor, MaybeAccessorValue } from '../types'

/**
 * Accesses the value of a MaybeAccessor
 *
 * @example
 * ```ts
 * access("foo") // => "foo"
 * access(() => "foo") // => "foo"
 * ```
 */
export function toValue<T extends MaybeAccessor<any>>(
  v: T,
): MaybeAccessorValue<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return typeof v === 'function' && v.length === 0 ? v() : v
}
