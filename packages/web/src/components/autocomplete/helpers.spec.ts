import { describe, expect, it } from 'vitest'

import { defaultQueryBuilder } from './helpers.ts'

describe('defaultQueryBuilder', () => {
  it('trims surrounding whitespace', () => {
    const match = /.*/.exec('   hello   ')!
    expect(defaultQueryBuilder(match)).toBe('hello')
  })

  it('preserves casing and punctuation', () => {
    const match = /.*/.exec('  C++ Notes  ')!
    expect(defaultQueryBuilder(match)).toBe('C++ Notes')
  })
})
