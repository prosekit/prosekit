import type { NodeJSON } from 'prosekit/core'

const TYPST_BLOCK = [
  '= Typst DSL',
  '',
  'This block renders a real Typst snippet.',
  '',
  '$ sum_(k=1)^n k = n(n+1)/2 $',
  '',
  '#table(',
  '  columns: 2,',
  '  [Renderer], [Output],',
  '  [Typst.ts], [SVG],',
  ')',
].join('\n')

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Typst Block' }] },
    { type: 'codeBlock', attrs: { language: 'typst' }, content: [{ type: 'text', text: TYPST_BLOCK }] },
  ],
}
