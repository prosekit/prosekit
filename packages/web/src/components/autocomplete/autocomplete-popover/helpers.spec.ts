import { describe, expect, it } from 'vitest'

import { defaultQueryBuilder } from './helpers'

describe('defaultQueryBuilder', () => {
  it('can remove extra spaces', () => {
    const str = '   a   '
    const match = /.*/.exec(str)!
    expect(defaultQueryBuilder(match)).toMatchInlineSnapshot('"a"')
  })

  it('can remove punctuations', () => {
    const str = '   a   ~!@#$%^&*()_+`-={}|[]\\:;"\'<>?,./     b  '
    const match = /.*/.exec(str)!
    expect(defaultQueryBuilder(match)).toMatchInlineSnapshot('"a b"')
  })
})
