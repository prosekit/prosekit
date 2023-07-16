import { describe, expect, it } from 'vitest'

import { defaultQueryBuilder } from './query-builder'

describe('defaultQueryBuilder', () => {
  it('can remove extra spaces', () => {
    const match1 = '   a   '.match(/.*/)!
    const match2 = '   b   '.match(/.*/)!
    expect(defaultQueryBuilder(match1, match2)).toMatchInlineSnapshot('"a b"')
  })

  it('can remove punctuations', () => {
    const match1 = '   a   ~!@#$%^&*()_+`-={}|[]\\:;"\'<>?,./'.match(/.*/)!
    const match2 = '   b   '.match(/.*/)!
    expect(defaultQueryBuilder(match1, match2)).toMatchInlineSnapshot('"a b"')
  })
})
