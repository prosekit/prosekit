import type {
  DOMOutputSpec,
  TagParseRule,
} from '@prosekit/pm/model'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { union } from '../editor/union'
import { setupTestFromExtension } from '../testing'
import {
  htmlFromNode,
  jsonFromNode,
} from '../utils/parse'

import { defineDoc } from './doc'
import {
  defineMarkAttr,
  defineMarkSpec,
} from './mark-spec'
import { defineParagraph } from './paragraph'
import { defineText } from './text'

describe('defineMarkSpec', () => {
  it('can merge mark specs', () => {
    const toDOM1 = (): DOMOutputSpec => ['strong', { 'data-ext1': '' }]
    const toDOM2 = (): DOMOutputSpec => ['strong', { 'data-ext2': '' }]
    const parseDOM1: TagParseRule = { tag: 'strong[data-ext1]' }
    const parseDOM2: TagParseRule = { tag: 'strong[data-ext2]' }
    const toDebugString2 = () => 'ext2'

    const ext1 = defineMarkSpec({
      name: 'bold',
      parseDOM: [parseDOM1],
      toDOM: toDOM1,
      attrs: {
        foo: { default: undefined },
        bar: { default: 'bar' },
        baz: { default: 'baz:1 ' },
      },
    })
    const ext2 = defineMarkSpec({
      name: 'bold',
      parseDOM: [parseDOM2],
      toDOM: toDOM2,
      toDebugString: toDebugString2,
      attrs: {
        foo: { default: 'foo' },
        bar: { default: undefined },
        baz: { default: 'baz:2' },
      },
    })

    const extension = union(
      ext1,
      ext2,
      defineDoc(),
      defineText(),
      defineParagraph(),
    )
    const schema = extension.schema
    expect(schema).toBeTruthy()
    expect(schema?.spec.marks.get('bold')).toEqual({
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
})

describe('defineMarkAttr', () => {
  it('can add a new attribute', () => {
    const boldExt = defineMarkSpec({
      name: 'bold',
      parseDOM: [{ tag: 'strong' }],
      toDOM() {
        return ['strong', 0]
      },
    })
    const textColorExt = defineMarkAttr({
      type: 'bold',
      attr: 'textColor',
      default: 'black',
      toDOM: (value) => ['style', `color: ${value}`],
      parseDOM: (node: HTMLElement) => node.style.color,
    })
    const backgroundColorExt = defineMarkAttr({
      type: 'bold',
      attr: 'backgroundColor',
      default: 'white',
      toDOM: (value) => ['style', `background-color: ${value}`],
      parseDOM: (node: HTMLElement) => node.style.backgroundColor,
    })
    const nodeIdExt = defineMarkAttr<'bold', 'markId', string | null>({
      type: 'bold',
      attr: 'markId',
      default: null,
      toDOM: (value) => (value ? ['data-mark-id', value] : null),
      parseDOM: (node: HTMLElement) => node.dataset.markId || null,
    })
    const extension = union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      textColorExt,
      backgroundColorExt,
      nodeIdExt,
      boldExt,
    )
    const { editor } = setupTestFromExtension(extension)

    expect(Object.keys(editor.schema.marks.bold.spec.attrs || {}))
      .toMatchInlineSnapshot(`
      [
        "textColor",
        "backgroundColor",
        "markId",
      ]
    `)

    editor.setContent(
      '<p><strong data-mark-id="123" style="background-color:blue;color:red;">Hello</strong></p>',
    )

    const json1 = jsonFromNode(editor.state.doc)
    expect(json1).toMatchInlineSnapshot(`
      {
        "content": [
          {
            "content": [
              {
                "marks": [
                  {
                    "attrs": {
                      "backgroundColor": "blue",
                      "markId": "123",
                      "textColor": "red",
                    },
                    "type": "bold",
                  },
                ],
                "text": "Hello",
                "type": "text",
              },
            ],
            "type": "paragraph",
          },
        ],
        "type": "doc",
      }
    `)
    expect(htmlFromNode(editor.state.doc)).toMatchInlineSnapshot(
      `"<div><p><strong style="background-color: blue; color: red" data-mark-id="123">Hello</strong></p></div>"`,
    )
    editor.setContent(htmlFromNode(editor.state.doc))
    const json2 = jsonFromNode(editor.state.doc)
    expect(json2).toEqual(json1)
  })
})
