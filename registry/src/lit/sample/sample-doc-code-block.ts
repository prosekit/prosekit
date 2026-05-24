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

const py = `
async def start():
    while True:
        await sleep()
        await eat()
        await code('Python!')
`.trim()

const go = `
func start() {
	for {
		sleep()
		eat()
		code('Go!')
	}
}
`.trim()

const flowchart = [
  'graph TD',
  '  A[Start] --> B{Is it working?}',
  '  B -->|Yes| C[Great!]',
  '  B -->|No| D[Debug]',
  '  D --> B',
  '  C --> E[End]',
].join('\n')

const sequence = [
  'sequenceDiagram',
  '  Alice->>Bob: Hello Bob!',
  '  Bob-->>Alice: Hi Alice!',
  '  Alice->>Bob: How are you?',
  '  Bob-->>Alice: Great, thanks!',
].join('\n')

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
      attrs: { language: 'python' },
      content: [{ type: 'text', text: py }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'go' },
      content: [{ type: 'text', text: go }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'mermaid' },
      content: [{ type: 'text', text: flowchart }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'mermaid' },
      content: [{ type: 'text', text: sequence }],
    },
  ],
}
