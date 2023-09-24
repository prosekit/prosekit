/* eslint-disable deprecation/deprecation */

export const isMac: boolean =
  typeof navigator !== 'undefined'
    ? /Mac|iP(hone|[ao]d)/.test(navigator.platform)
    : false
