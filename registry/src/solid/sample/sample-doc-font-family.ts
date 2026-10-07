import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Select text and choose a font from the inline menu. ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'fontFamily',
              attrs: {
                family: 'Georgia, serif',
              },
            },
          ],
          text: 'Georgia',
        },
        {
          type: 'text',
          text: ', ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'fontFamily',
              attrs: {
                family: 'Courier New, monospace',
              },
            },
          ],
          text: 'Courier New',
        },
        {
          type: 'text',
          text: ', ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'fontFamily',
              attrs: {
                family: 'Impact, sans-serif',
              },
            },
          ],
          text: 'Impact',
        },
        {
          type: 'text',
          text: ', ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'fontFamily',
              attrs: {
                family: 'Comic Sans MS, cursive',
              },
            },
          ],
          text: 'Comic Sans',
        },
        {
          type: 'text',
          text: '.',
        },
      ],
    },
  ],
}
