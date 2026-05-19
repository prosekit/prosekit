import type { NodeJSON } from 'prosekit/core'

const MERMAID_FLOWCHART = [
  'graph TD',
  '  A[Start] --> B{Is it working?}',
  '  B -->|Yes| C[Great!]',
  '  B -->|No| D[Debug]',
  '  D --> B',
  '  C --> E[End]',
].join('\n')

const MERMAID_SEQUENCE = [
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
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Mermaid Flowchart' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Type ' },
        { type: 'text', marks: [{ type: 'code' }], text: '```mermaid' },
        { type: 'text', text: ' and press Enter to create a Mermaid diagram block.' },
      ],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'mermaid' },
      content: [{ type: 'text', text: MERMAID_FLOWCHART }],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Mermaid Sequence Diagram' }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'mermaid' },
      content: [{ type: 'text', text: MERMAID_SEQUENCE }],
    },
  ],
}
