import { addDoc, addParagraph, addText, createEditor } from '@prosekit/core'
import { describe, it, expect } from 'vitest'

import { addList } from './index'

describe('addList', () => {
  it('can add list node', () => {
    const extension = [addList(), addDoc(), addText(), addParagraph()]
    const editor = createEditor({ extension: { extension } })
    const schema = editor.schema
    const nodes = Object.keys(schema.nodes)
    expect(nodes.includes('list')).toBe(true)
  })
})
