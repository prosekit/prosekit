import { createEditor, defineExtension } from '@prosekit/core'
import { describe, it, expect } from 'vitest'

import { addBasicExtension } from './index'

describe('addBasicExtension', () => {
  it('can add nodes and marks', () => {
    const extension = defineExtension([addBasicExtension()])
    const editor = createEditor({ extension })
    const schema = editor.schema
    const nodes = Object.keys(schema.nodes).sort()
    const marks = Object.keys(schema.marks).sort()

    expect(nodes).toMatchInlineSnapshot(`
      [
        "codeBlock",
        "doc",
        "heading",
        "list",
        "paragraph",
        "text",
      ]
    `)
    expect(marks).toMatchInlineSnapshot(`
      [
        "italic",
      ]
    `)
  })
})
