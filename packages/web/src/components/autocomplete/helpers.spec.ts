import { describe, expect, it } from 'vitest'

import { defaultQueryBuilder } from './helpers.ts'

describe('defaultQueryBuilder', () => {
  it('returns the matched text without normalization', () => {
    const match = /.*/.exec('  C++ Notes  ')!
    expect(defaultQueryBuilder(match)).toBe('  C++ Notes  ')
  })
})
