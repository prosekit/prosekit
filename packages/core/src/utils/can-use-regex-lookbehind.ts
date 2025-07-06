import { once } from '@ocavue/utils'

export const canUseRegexLookbehind: () => boolean = once(() => {
  try {
    return 'ab'.replace(new RegExp('(?<=a)b', 'g'), 'c') === 'ac'
  } catch {
    return false
  }
})
