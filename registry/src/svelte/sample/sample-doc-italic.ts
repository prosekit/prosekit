import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'italic',
            },
          ],
          text: 'This is italic',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'italic',
            },
          ],
          text: 'This is italic too',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is normal text',
        },
      ],
    },
  ],
}
