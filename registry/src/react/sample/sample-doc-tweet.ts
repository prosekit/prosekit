import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Render a tweet in your document',
        },
      ],
    },
    {
      type: 'tweet',
      attrs: {
        tweetId: '20',
      },
    },
  ],
}
