import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{
        type: 'text',
        text: 'This example compares how editor-level Suspense boundaries interact with async React node views.',
      }],
    },
    {
      type: 'asyncBlock',
      attrs: {
        seed: 'seed-0',
      },
    },
    {
      type: 'paragraph',
      content: [{
        type: 'text',
        text: 'Click the button in the block to trigger another suspended render.',
      }],
    },
  ],
}
