import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The content is readonly. Press the buttons above to toggle the readonly mode.',
        },
      ],
    },
  ],
}
