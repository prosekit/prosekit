import { describe, expect, test } from 'vitest'

import { createEditor } from '../editor/editor.ts'
import { defineTestExtension } from '../testing/index.ts'

import { elementFromHTML, htmlFromNode, nodeFromElement, nodeFromHTML } from './parse.ts'

describe('parse', () => {
  const extension = defineTestExtension()
  const editor = createEditor({ extension })
  const schema = editor.schema
  const n = editor.nodes

  const element = document.createElement('div')
  element.innerHTML = '<p>hello</p>'

  const node = n.doc(n.paragraph(schema.text('hello')))

  const html = '<p>hello</p>'

  test('nodeFromElement', () => {
    expect(node.eq(nodeFromElement(element, { schema }))).toBe(true)
  })

  test('nodeFromHTML', () => {
    expect(nodeFromHTML(html, { schema }).eq(node)).toBe(true)
  })

  test('elementFromHTML', () => {
    expect(elementFromHTML(html).innerHTML).toBe(html)
  })

  test('htmlFromNode', () => {
    expect(htmlFromNode(node)).toBe('<div><p>hello</p></div>')
    expect(htmlFromNode(node.child(0))).toBe('<p>hello</p>')
  })
})
