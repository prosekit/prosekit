import type { Schema } from '@prosekit/pm/model'
import { describe, expect, it } from 'vitest'

import { union } from '../editor/union'

import { defineDoc } from './doc'
import { defineHistory } from './history'
import { defineBaseKeymap } from './keymap'
import { defineNodeSpec } from './node-spec'
import { defineParagraph } from './paragraph'
import { defineText } from './text'

function defineCodeBlockSpec() {
  return defineNodeSpec({
    name: 'codeBlock',
    content: 'text*',
    group: 'block',
    code: true,
  })
}

describe('node-spec', () => {
  it('can reuse schema', () => {
    const ext1 = union([defineDoc(), defineText(), defineParagraph()])
    const ext2 = union([defineBaseKeymap()])
    const ext3 = union([ext1, ext2])

    const schema1 = ext1.schema
    const schema2 = ext2.schema
    const schema3 = ext3.schema

    expect(schema1).toBeTruthy()
    expect(schema2).toEqual(null)
    expect(schema3).toBeTruthy()

    expect(schema3 === schema1).toBe(true)

    expect(formatSchema(schema3)).toMatchInlineSnapshot(`
      {
        "marks": "",
        "nodes": "doc, paragraph, text",
        "topNode": "doc",
      }
    `)

    const ext4 = defineCodeBlockSpec()
    const ext5 = union([ext3, ext4])
    const schema5 = ext5.schema
    expect(schema5).toBeTruthy()

    expect(formatSchema(schema5)).toMatchInlineSnapshot(`
      {
        "marks": "",
        "nodes": "codeBlock, doc, paragraph, text",
        "topNode": "doc",
      }
    `)

    expect(schema5 !== schema1).toBe(true)

    const ext6 = union([ext5, defineHistory()])
    const schema6 = ext6.schema
    expect(schema6).toBeTruthy()

    expect(schema6 === schema5).toBe(true)
  })
})

function formatSchema(schema: Schema | null | undefined) {
  if (!schema) {
    return null
  }

  const nodes = Object.keys(schema.spec.nodes.toObject())
  const marks = Object.keys(schema.spec.marks.toObject())
  const topNode = schema.spec.topNode

  nodes.sort()
  marks.sort()
  return { nodes: nodes.join(', '), marks: marks.join(', '), topNode }
}
