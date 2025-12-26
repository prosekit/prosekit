import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'A WIP Notion-like Editor' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Paragraph',
        },
      ],
    },
    {
      type: 'image',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Paragraph',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/season/320x240/107',
      },
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Paragraph',
        },
      ],
    },
  ],
}
