import type { NodeSpec } from 'prosemirror-model'

/**
 * A {@link NodeSpec} for a block-level math node.
 *
 * @public
 */
export const mathBlockSpec: NodeSpec = {
  atom: false,
  group: 'block math',
  content: 'text*',
  code: true,
  toDOM() {
    return [
      'div',
      {
        class: 'prosemirror-math-block',
      },
      ['pre', ['code', 0]],
    ]
  },
  parseDOM: [
    {
      tag: 'div.prosemirror-math-block',

      // skip the `<pre>` wrapper so that the node `codeBlock` won't match the content.
      // TODO: add test to verify it
      contentElement: 'code',
    },
  ],
}
