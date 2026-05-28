import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{
        type: 'text',
        text: 'Edit the input below and move the caret into the middle of the text.',
      }],
    },
    {
      type: 'inputBlock',
      attrs: {
        value: 'hello world',
      },
    },
  ],
}
