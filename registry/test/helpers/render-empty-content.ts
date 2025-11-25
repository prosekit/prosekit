import type { NodeJSON } from 'prosekit/core'

export const EMPTY_CONTENT: NodeJSON = {
  type: 'doc',
  content: [
    { type: 'paragraph', content: [] },
  ],
}
