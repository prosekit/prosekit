import type { NodeSpec } from 'prosemirror-model'

export const mathBlockSpec: NodeSpec = {
  atom: false,
  group: 'block math',
  content: 'text*',
  code: true,
  toDOM() {
    return [
      'div',
      {
        class: 'prosekit-math-block',
      },
      ['pre', ['code', 0]],
    ]
  },
  parseDOM: [
    {
      tag: 'div.prosekit-math-block',

      // skip the `<pre>` wrapper so that the node `codeBlock` won't match the content.
      // TODO: add test to verify it
      contentElement: 'code',
    },
  ],
}
