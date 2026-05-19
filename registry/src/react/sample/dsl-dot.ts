import type { NodeJSON } from 'prosekit/core'

const DOT_PIPELINE = [
  'digraph G {',
  '  rankdir=LR;',
  '  graph [pad="0.2"];',
  '  node [shape=box, style="rounded,filled", fillcolor="#f8fafc", color="#94a3b8"];',
  '  edge [color="#475569"];',
  '  Client -> API -> Worker -> Database;',
  '  API -> Cache [style=dashed];',
  '}',
].join('\n')

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Graphviz DOT Diagram' }] },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Create a fenced dot block to render Graphviz diagrams in place.' }],
    },
    { type: 'codeBlock', attrs: { language: 'dot' }, content: [{ type: 'text', text: DOT_PIPELINE }] },
  ],
}
