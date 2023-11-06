import {
  defineDoc,
  defineParagraph,
  defineText,
  createEditor,
  union,
} from '@prosekit/core'
import { describe, it, expect } from 'vitest'

import { defineList } from './index'

describe('defineList', () => {
  it('can add list node', () => {
    const extension = union([
      defineList(),
      defineDoc(),
      defineText(),
      defineParagraph(),
    ])
    const editor = createEditor({ extension })
    const schema = editor.schema
    const nodes = Object.keys(schema.nodes)
    expect(nodes.includes('list')).toBe(true)
  })
})
