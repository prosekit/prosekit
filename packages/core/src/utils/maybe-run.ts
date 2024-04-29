/**
 * @internal
 */
export function maybeRun<
  T,
  R = T extends (...args: any[]) => void ? ReturnType<T> : T,
>(
  value: T,
  ...args: T extends (...args: any[]) => void ? Parameters<T> : never
): R {
  return (typeof value === 'function' ? value(...args) : value) as R
}
