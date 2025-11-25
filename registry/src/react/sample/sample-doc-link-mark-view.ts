import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Here is a link that changes color every second: ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.example.com',
                target: null,
                rel: null,
              },
            },
          ],
          text: 'example link',
        },
      ],
    },
  ],
}
