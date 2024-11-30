import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { jsonFromNode } from '../utils/parse'

import type { NodeChild } from './action'

describe('NodeAction', () => {
  const { editor, n } = setupTest()

  it('can apply node', () => {
    expect(n.heading('foo').toJSON()).toEqual({
      type: 'heading',
      content: [{ text: 'foo', type: 'text' }],
    })
  })

  it('can apply node with attrs', () => {
    expect(n.codeBlock({ language: 'javascript' }, 'foo').toJSON()).toEqual({
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [{ text: 'foo', type: 'text' }],
    })
  })

  it('can check node activity', () => {
    editor.set(n.doc(n.heading('<a>foo<b>')))
    expect(editor.nodes.heading.isActive()).toBe(true)
    expect(editor.nodes.paragraph.isActive()).toBe(false)
  })
})

describe('MarkAction', () => {
  const { editor, m, n } = setupTest()

  it('can apply mark', () => {
    expect(n.p(m.bold('foo')).toJSON()).toEqual({
      type: 'paragraph',
      content: [{ marks: [{ type: 'bold' }], text: 'foo', type: 'text' }],
    })
  })

  it('can apply mark with attrs', () => {
    expect(
      n.p(m.link({ href: 'https://example.com' }, 'foo')).toJSON(),
    ).toEqual({
      type: 'paragraph',
      content: [
        {
          marks: [{ type: 'link', attrs: { href: 'https://example.com' } }],
          text: 'foo',
          type: 'text',
        },
      ],
    })
  })

  it('can apply multiple marks', () => {
    const json = jsonFromNode(n.p(m.bold(m.italic('foo'))))
    const marks = json.content?.[0].marks?.map((mark) => mark.type)
    expect(marks?.sort()).toEqual(['bold', 'italic'])
  })

  it('can apply the same mark multiple times', () => {
    const href1 = 'https://example.com/1'
    const href2 = 'https://example.com/2'
    const link1 = (node: NodeChild) => m.link({ href: href1 }, node)
    const link2 = (node: NodeChild) => m.link({ href: href2 }, node)

    expect(n.p(link1('foo')).toJSON()).toEqual({
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'foo',
          marks: [{ attrs: { href: href1 }, type: 'link' }],
        },
      ],
    })

    expect(n.p(link2(link1('foo'))).toJSON()).toEqual({
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'foo',
          marks: [{ attrs: { href: href2 }, type: 'link' }],
        },
      ],
    })

    expect(n.p(link2(link2(link2('foo')))).toJSON()).toEqual({
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'foo',
          marks: [{ attrs: { href: href2 }, type: 'link' }],
        },
      ],
    })
  })

  it('can check mark activity', () => {
    editor.set(n.doc(n.p('<a>foo<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)
    expect(editor.marks.italic.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', m.bold('foo'), '<b>')))
    expect(editor.marks.bold.isActive()).toBe(true)
    expect(editor.marks.italic.isActive()).toBe(false)
  })

  it('can check mark activity for cross-paragraph selection', () => {
    editor.set(n.doc(n.p('<a>', m.bold('foo')), n.p(m.bold('foo'), '<b>')))

    expect(editor.marks.bold.isActive()).toBe(true)
    expect(editor.marks.italic.isActive()).toBe(false)
  })

  it('should not set isActive to true when only part of the text is marked', () => {
    editor.set(n.doc(n.p('<a>', 'foo', m.bold('bar'), 'baz', '<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', m.bold('foo'), 'bar', '<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', 'foo', m.bold('bar'), '<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)

    editor.set(n.doc(n.p('<a>', m.bold('foo', 'bar'), '<b>')))
    expect(editor.marks.bold.isActive()).toBe(true)
  })

  it('should not set isActive to true when multiple empty paragraphs are selected', () => {
    editor.set(n.doc(n.p('<a>'), n.p(''), n.p('<b>')))
    expect(editor.marks.bold.isActive()).toBe(false)
  })
})
