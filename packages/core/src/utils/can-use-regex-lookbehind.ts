import { once } from '@ocavue/utils'

/**
 * Checks if the browser supports [regex lookbehind assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion).
 */
export const canUseRegexLookbehind: () => boolean = once(() => {
  try {
    return 'ab'.replace(new RegExp('(?<=a)b', 'g'), 'c') === 'ac'
  } catch {
    return false
  }
})
