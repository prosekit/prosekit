/* eslint-disable deprecation/deprecation */

// TODO: Use the code from @prosekit/core

export const isApple: boolean =
  typeof navigator !== 'undefined'
    ? /Mac|iP(hone|[ao]d)/.test(navigator.platform)
    : false
