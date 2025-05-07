import clsxLite from 'clsx/lite'

/**
 * A utility for constructing `className` strings conditionally.
 *
 * It is a re-export of [clsx/lite](https://www.npmjs.com/package/clsx) with stricter types.
 *
 * @public
 */
export const clsx: (
  ...args: Array<string | boolean | null | undefined>
) => string = clsxLite
