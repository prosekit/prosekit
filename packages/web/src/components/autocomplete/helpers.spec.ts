import { describe, expect, it } from 'vitest'

import { defaultQueryBuilder } from './helpers.ts'

describe('defaultQueryBuilder', () => {
  it('uses the first capture group as the query', () => {
    const match = /#([\da-z]*)$/i.exec('#Foo')!
    expect(defaultQueryBuilder(match)).toBe('Foo')
  })

  it('returns an empty query when an optional capture group is absent', () => {
    const match = /(?<!\S)\/(\S.*)?$/u.exec('/')!
    expect(defaultQueryBuilder(match)).toBe('')
  })

  it('preserves casing and punctuation', () => {
    const match = /@(\S.*)?$/u.exec('@C++ Notes')!
    expect(defaultQueryBuilder(match)).toBe('C++ Notes')
  })

  it('falls back to the whole match when there is no capture group', () => {
    const match = /.*/.exec('  Hello World  ')!
    expect(defaultQueryBuilder(match)).toBe('Hello World')
  })
})
