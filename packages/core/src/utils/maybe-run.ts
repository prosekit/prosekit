/**
 * @internal
 */
export function maybeRun<
  Value,
  Args extends unknown[],
>(value: Value | ((...args: Args) => Value), ...args: Args): Value {
  return typeof value === 'function'
    ? (value as (...args: Args) => Value)(...args)
    : value
}
