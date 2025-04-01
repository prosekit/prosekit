/**
 * Accesses the value of a MaybeAccessor
 *
 * @example
 * ```ts
 * access("foo") // => "foo"
 * access(() => "foo") // => "foo"
 * ```
 */
export function toValue<T>(
  v: (() => T) | T,
): T {
  return (typeof v === 'function') ? (v as () => T)() : v
}
