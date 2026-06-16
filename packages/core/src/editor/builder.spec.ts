import { describe, expect, expectTypeOf, it } from 'vitest'

import { defineTestExtension } from '../testing/index.ts'

import { createMarkBuilders, createNodeBuilders } from './builder.ts'
import { createEditor } from './editor.ts'

describe('createNodeBuilders', () => {
  const extension = defineTestExtension()
  const schema = createEditor({ extension }).schema
  const n = createNodeBuilders<typeof extension>(schema)

  it('builds a node from a string child', () => {
    expect(n.heading('foo').toJSON()).toEqual({
      type: 'heading',
      content: [{ text: 'foo', type: 'text' }],
    })
  })

  it('builds a node with attributes', () => {
    expect(n.codeBlock({ language: 'javascript' }, 'foo').toJSON()).toEqual({
      type: 'codeBlock',
      attrs: { language: 'javascript', lineNumbers: false },
      content: [{ text: 'foo', type: 'text' }],
    })
  })

  it('nests node children', () => {
    expect(n.doc(n.paragraph('hello'), n.heading('world')).toJSON()).toEqual({
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'hello' }] },
        { type: 'heading', content: [{ type: 'text', text: 'world' }] },
      ],
    })
  })

  it('flattens array children', () => {
    expect(n.paragraph(['foo', 'bar']).textContent).toBe('foobar')
  })

  it('fills required content when no children are given', () => {
    expect(n.doc().toJSON()).toEqual({
      type: 'doc',
      content: [{ type: 'paragraph' }],
    })
  })

  it('does not expose isActive', () => {
    expect('isActive' in n.paragraph).toBe(false)
  })

  it('exposes a builder for every node in the schema', () => {
    expect(Object.keys(n).sort()).toEqual(Object.keys(schema.nodes).sort())
  })

  it('is typed per node name', () => {
    expectTypeOf(n.paragraph).toBeFunction()
    expectTypeOf(n.heading).toBeFunction()
    expectTypeOf(n.heading).toBeCallableWith({ level: 1 }, 'foo')
    expectTypeOf(n).not.toHaveProperty('nonExistentNode')
  })
})

describe('createMarkBuilders', () => {
  const extension = defineTestExtension()
  const schema = createEditor({ extension }).schema
  const n = createNodeBuilders<typeof extension>(schema)
  const m = createMarkBuilders<typeof extension>(schema)

  it('applies a mark to text', () => {
    expect(n.paragraph(m.bold('foo')).toJSON()).toEqual({
      type: 'paragraph',
      content: [{ marks: [{ type: 'bold' }], text: 'foo', type: 'text' }],
    })
  })

  it('applies a mark with attributes', () => {
    expect(n.paragraph(m.link({ href: 'https://example.com' }, 'foo')).toJSON()).toEqual({
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'foo',
          marks: [{ type: 'link', attrs: { href: 'https://example.com', target: null, rel: null } }],
        },
      ],
    })
  })

  it('returns an array of nodes', () => {
    expect(Array.isArray(m.bold('foo'))).toBe(true)
  })

  it('does not expose isActive', () => {
    expect('isActive' in m.bold).toBe(false)
  })

  it('is typed per mark name', () => {
    expectTypeOf(m.bold).toBeFunction()
    expectTypeOf(m).not.toHaveProperty('nonExistentMark')
  })
})
