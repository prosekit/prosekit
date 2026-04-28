/**
 * A tiny utility for constructing `className` strings conditionally.
 *
 * It accepts a variable number of arguments, which can be a string, boolean,
 * null, or undefined. The function concatenates the string arguments and
 * ignores the falsy values (false, null, undefined).
 *
 * @public
 */
export function clsx(...args: Array<string | boolean | null | undefined>): string {
  return args.filter(x => typeof x === 'string').join(' ')
}
