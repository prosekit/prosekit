import { cache } from './cache'

export const canUseRegexLookbehind = cache((): boolean => {
  try {
    return 'ab'.replace(new RegExp('(?<=a)b', 'g'), 'c') === 'ac'
  } catch   {
    return false
  }
})
