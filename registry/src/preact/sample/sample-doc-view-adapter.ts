import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'An example of using prosemirror-adapter to render custom node views',
        },
      ],
    },
    {
      type: 'atomBlock',
    },
  ],
}
