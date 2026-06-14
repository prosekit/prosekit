import { union } from '@prosekit/core'
import { defineDoc } from '@prosekit/extensions/doc'
import { defineParagraph } from '@prosekit/extensions/paragraph'
import { defineText } from '@prosekit/extensions/text'
import { defineBold } from '@prosekit/extensions/bold'
import { defineHeading } from '@prosekit/extensions/heading'
import { defineCodeBlock } from '@prosekit/extensions/code-block'
import { defineBlockquote } from '@prosekit/extensions/blockquote'
import { describe, expect, it } from 'vitest'

import { renderToMarkdown } from './markdown'

const extension = union(
  defineDoc(),
  defineParagraph(),
  defineText(),
  defineBold(),
  defineHeading(),
  defineCodeBlock(),
  defineBlockquote(),
)

describe('renderToMarkdown', () => {
  it('renders a simple paragraph', () => {
    const md = renderToMarkdown({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] },
        ],
      },
    })
    expect(md).toBe('\nHello World\n')
  })

  it('renders heading', () => {
    const md = renderToMarkdown({
      extension,
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Title' }] },
        ],
      },
    })
    expect(md).toBe('# Title\n')
  })

  it('renders bold text', () => {
    const md = renderToMarkdown({
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
    expect(md).toBe('\n**Hello** World\n')
  })

  it('renders code block', () => {
    const md = renderToMarkdown({
      extension,
      content: {
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'javascript' },
            content: [{ type: 'text', text: 'console.log("hello")' }],
          },
        ],
      },
    })
    expect(md).toBe('\n```javascript\nconsole.log("hello")\n```\n')
  })

  it('renders blockquote', () => {
    const md = renderToMarkdown({
      extension,
      content: {
        type: 'doc',
        content: [
          {
            type: 'blockquote',
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'Quoted text' }] },
            ],
          },
        ],
      },
    })
    expect(md).toContain('> Quoted text')
  })
})
