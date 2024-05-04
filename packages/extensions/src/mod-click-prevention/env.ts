/* eslint-disable deprecation/deprecation */

/**
 * @deprecated Use `isApple` from `@prosekit/core`
 */
export const isApple: boolean =
  typeof navigator !== 'undefined'
    ? /Mac|iP(hone|[ao]d)/.test(navigator.platform)
    : false
