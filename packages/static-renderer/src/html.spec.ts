import { union } from '@prosekit/core'
import { defineDoc } from '@prosekit/extensions/doc'
import { defineParagraph } from '@prosekit/extensions/paragraph'
import { defineText } from '@prosekit/extensions/text'
import { defineBold } from '@prosekit/extensions/bold'
import { defineHeading } from '@prosekit/extensions/heading'
import { describe, expect, it } from 'vitest'

import { renderToHTMLString } from './html'

const extension = union(
  defineDoc(),
  defineParagraph(),
  defineText(),
  defineBold(),
  defineHeading(),
)

describe('renderToHTMLString', () => {
  it('renders a simple paragraph', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] },
        ],
      },
    })
    expect(html).toBe('<p>Hello World</p>')
  })

  it('renders bold text', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Hello', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' World' },
            ],
          },
        ],
      },
    })
    expect(html).toBe('<p><strong>Hello</strong> World</p>')
  })

  it('renders headings', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Title' }] },
        ],
      },
    })
    expect(html).toBe('<h1>Title</h1>')
  })

  it('renders heading level 2', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Subtitle' }] },
        ],
      },
    })
    expect(html).toBe('<h2>Subtitle</h2>')
  })

  it('renders empty document', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [],
      },
    })
    expect(html).toBe('')
  })

  it('renders multiple paragraphs', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'First' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Second' }] },
        ],
      },
    })
    expect(html).toBe('<p>First</p><p>Second</p>')
  })

  it('supports custom nodeMapping', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
        ],
      },
      nodeMapping: {
        paragraph: ({ children }) => `<div class="custom-p">${children}</div>`,
      },
    })
    expect(html).toBe('<div class="custom-p">Hello</div>')
  })

  it('supports custom markMapping', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Hello', marks: [{ type: 'bold' }] },
            ],
          },
        ],
      },
      markMapping: {
        bold: ({ children }) => `<b>${children}</b>`,
      },
    })
    expect(html).toBe('<p><b>Hello</b></p>')
  })

  it('escapes HTML in text', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: '<script>alert("xss")</script>' }] },
        ],
      },
    })
    expect(html).toBe('<p>&lt;script&gt;alert("xss")&lt;/script&gt;</p>')
  })

  it('renders nested content', () => {
    const html = renderToHTMLString({
      extension,
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'A' },
              { type: 'text', text: 'B', marks: [{ type: 'bold' }] },
              { type: 'text', text: 'C', marks: [{ type: 'bold' }] },
            ],
          },
        ],
      },
    })
    expect(html).toBe('<p>A<strong>BC</strong></p>')
  })
})
