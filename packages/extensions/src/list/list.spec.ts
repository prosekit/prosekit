import {
  createEditor,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from '@prosekit/core'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { defineList } from './index'

describe('defineList', () => {
  it('can add list node', () => {
    const extension = union(
      defineList(),
      defineDoc(),
      defineText(),
      defineParagraph(),
    )
    const editor = createEditor({ extension })
    const schema = editor.schema
    const nodes = Object.keys(schema.nodes)
    expect(nodes.includes('list')).toBe(true)
  })
})
