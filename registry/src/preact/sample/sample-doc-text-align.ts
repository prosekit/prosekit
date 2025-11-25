import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
        textAlign: 'center',
      },
      content: [
        {
          type: 'text',
          text: 'Heading',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'First paragraph',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'center',
      },
      content: [
        {
          type: 'text',
          text: 'Second paragraph',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'right',
      },
      content: [
        {
          type: 'text',
          text: 'Third paragraph',
        },
      ],
    },
  ],
}
