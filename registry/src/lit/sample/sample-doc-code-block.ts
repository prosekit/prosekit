import type { NodeJSON } from 'prosekit/core'

const js = `
async function start() {
  while (true) {
    await sleep()
    await eat()
    await code('JavaScript!')
  }
}
`.trim()

const mermaid = `
sequenceDiagram
  Alice->>Bob: Hello Bob!
  Bob-->>Alice: Hi Alice!
  Alice->>Bob: How are you?
  Bob-->>Alice: Great, thanks!
`.trim()

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [{ type: 'text', text: js }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'mermaid' },
      content: [{ type: 'text', text: mermaid }],
    },
  ],
}
