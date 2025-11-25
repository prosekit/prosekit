import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Click the gap between two images or press arrow keys to see the gap cursor between two images',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/minimal/320x180/42',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/minimal/320x180/42',
      },
    },
  ],
}
