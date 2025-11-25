import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Drag the images below to see the custom drop cursor.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/yellow/320x240/42',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/green/320x240/40',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/blue/320x240/187',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/red/320x240/188',
      },
    },
  ],
}
