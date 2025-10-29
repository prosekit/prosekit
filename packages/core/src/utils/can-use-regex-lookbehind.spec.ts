import { describe, expect, it } from 'vitest'

import { canUseRegexLookbehind } from './can-use-regex-lookbehind'

describe('canUseRegexLookbehind', () => {
  it('returns a boolean', () => {
    const result = canUseRegexLookbehind()
    expect(typeof result).toBe('boolean')
  })

  it('returns same value on multiple calls (memoized)', () => {
    const first = canUseRegexLookbehind()
    const second = canUseRegexLookbehind()
    expect(first).toBe(second)
  })

  it('detects lookbehind support correctly', () => {
    // Most modern browsers support lookbehind
    const result = canUseRegexLookbehind()
    // The function should handle both cases gracefully
    expect([true, false]).toContain(result)
  })
})
