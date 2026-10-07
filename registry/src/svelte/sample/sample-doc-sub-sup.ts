import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'H',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'subscript',
            },
          ],
          text: '2',
        },
        {
          type: 'text',
          text: 'O is water. x',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'superscript',
            },
          ],
          text: '2',
        },
        {
          type: 'text',
          text: ' is a square.',
        },
      ],
    },
  ],
}
