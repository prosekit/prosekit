import type { DOMOutputSpec, Schema, TagParseRule } from '@prosekit/pm/model'
import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { union } from '../editor/union'
import { defineDoc, defineParagraph, defineText, setupTestFromExtension } from '../testing'

import { defineHistory } from './history'
import { defineBaseKeymap } from './keymap-base'
import { defineNodeAttr, defineNodeSpec } from './node-spec'

describe('defineNodeSpec', () => {
  it('can merge node specs', () => {
    const toDOM1 = (): DOMOutputSpec => ['p', { 'data-ext1': '' }]
    const toDOM2 = (): DOMOutputSpec => ['p', { 'data-ext2': '' }]
    const parseDOM1: TagParseRule = { tag: 'p[data-ext1]' }
    const parseDOM2: TagParseRule = { tag: 'p[data-ext2]' }
    const toDebugString2 = () => 'ext2'
    const leafText1 = () => 'text'

    const ext1 = defineNodeSpec({
      name: 'paragraph',
      content: 'text*',
      leafText: leafText1,
      parseDOM: [parseDOM1],
      toDOM: toDOM1,
      attrs: {
        foo: { default: undefined },
        bar: { default: 'bar' },
        baz: { default: 'baz:1 ' },
      },
    })
    const ext2 = defineNodeSpec({
      name: 'paragraph',
      group: 'block',
      leafText: undefined,
      parseDOM: [parseDOM2],
      toDOM: toDOM2,
      toDebugString: toDebugString2,
      attrs: {
        foo: { default: 'foo' },
        bar: { default: undefined },
        baz: { default: 'baz:2' },
      },
    })

    const extension = union(ext1, ext2, defineDoc(), defineText())
    const schema = extension.schema
    expect(schema).toBeTruthy()
    expect(schema?.spec.nodes.get('paragraph')).toEqual({
      group: 'block',
      content: 'text*',
      leafText: leafText1,
      parseDOM: [parseDOM1, parseDOM2],
      toDOM: toDOM2,
      toDebugString: toDebugString2,
      attrs: {
        foo: { default: 'foo' },
        bar: { default: 'bar' },
        baz: { default: 'baz:2' },
      },
    })
  })

  it('can reuse schema', () => {
    const ext1 = union(defineDoc(), defineText(), defineParagraph())
    const ext2 = union(defineBaseKeymap())
    const ext3 = union(ext1, ext2)

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
    const ext5 = union(ext3, ext4)
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

    const ext6 = union(ext5, defineHistory())
    const schema6 = ext6.schema
    expect(schema6).toBeTruthy()

    expect(schema6 === schema5).toBe(true)
  })
})

describe('defineNodeAttr', () => {
  it('can add a new attribute', () => {
    const textColorExt = defineNodeAttr({
      type: 'paragraph',
      attr: 'textColor',
      default: 'black',
      toDOM: (value) => ['style', `color: ${value}`],
      parseDOM: (node: HTMLElement) => node.style.color,
    })
    const backgroundColorExt = defineNodeAttr({
      type: 'paragraph',
      attr: 'backgroundColor',
      default: 'white',
      toDOM: (value) => ['style', `background-color: ${value}`],
      parseDOM: (node: HTMLElement) => node.style.backgroundColor,
    })
    const nodeIdExt = defineNodeAttr<'paragraph', 'nodeId', string | null>({
      type: 'paragraph',
      attr: 'nodeId',
      default: null,
      toDOM: (value) => (value ? ['data-node-id', value] : null),
      parseDOM: (node: HTMLElement) => node.dataset.nodeId ?? null,
    })
    const extension = union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      textColorExt,
      backgroundColorExt,
      nodeIdExt,
    )
    const { editor } = setupTestFromExtension(extension)

    expect(Object.keys(editor.schema.nodes.paragraph.spec.attrs || {}))
      .toMatchInlineSnapshot(`
      [
        "textColor",
        "backgroundColor",
        "nodeId",
      ]
    `)

    editor.setContent(
      '<p data-node-id="123" style="background-color:blue;color:red;">Hello</p>',
    )

    const json1 = editor.getDocJSON()
    const html1 = editor.getDocHTML()
    expect(json1).toEqual({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { nodeId: '123', textColor: 'red', backgroundColor: 'blue' },
          content: [{ type: 'text', text: 'Hello' }],
        },
      ],
    })
    expect(formatHTML(html1)).toMatchInlineSnapshot(`
      "
      <div>
        <p
          data-node-id="123"
          style="background-color: blue; color: red;"
        >
          Hello
        </p>
      </div>
      "
    `)
    editor.setContent(html1)
    const json2 = editor.getDocJSON()
    expect(json2).toEqual(json1)
  })
})

function defineCodeBlockSpec() {
  return defineNodeSpec({
    name: 'codeBlock',
    content: 'text*',
    group: 'block',
    code: true,
  })
}

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
