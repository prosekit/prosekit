import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'H1' }] },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'H2' }] },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'H3' }] },
    { type: 'paragraph', content: [] },
  ],
}
