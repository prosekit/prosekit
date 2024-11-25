import {
  definePlugin,
  findParentNode,
  isInCodeBlock,
  maybeRun,
} from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { type EditorState, Plugin, PluginKey } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

export interface PlaceholderOptions {
  /**
   * The placeholder to use. It can be a static string or a function that
   * receives the current editor state and returns a string.
   */
  placeholder: string | ((state: EditorState) => string)

  /**
   * By default, the placeholder text will be shown whenever the current text
   * cursor is in an empty text node. If you only want to show the placeholder
   * when the whole doc is empty, you can set this option to 'doc'.
   *
   * @default 'block'
   */
  strategy?: 'doc' | 'block'
}

/**
 * Add a placeholder text to the editor when the current block or document is
 * empty.
 */
export function definePlaceholder(options: PlaceholderOptions) {
  return definePlugin(createPlaceholderPlugin(options))
}

function createPlaceholderPlugin({
  placeholder,
  strategy = 'block',
}: PlaceholderOptions): Plugin {
  return new Plugin({
    key: new PluginKey('prosekit-placeholder'),
    props: {
      decorations: (state) => {
        if (strategy === 'doc' && !isDocEmpty(state.doc)) {
          return null
        }

        if (isInCodeBlock(state.selection)) {
          return null
        }

        const placeholderText: string = maybeRun(placeholder, state)
        const deco = createPlaceholderDecoration(state, placeholderText)
        if (!deco) {
          return null
        }

        return DecorationSet.create(state.doc, [deco])
      },
    },
  })
}

function isDocEmpty(doc: ProseMirrorNode) {
  return doc.childCount <= 1 && !doc.firstChild?.content.size
}

function createPlaceholderDecoration(
  state: EditorState,
  placeholderText: string,
): Decoration | null {
  const { selection } = state
  if (!selection.empty) return null

  const $pos = selection.$anchor
  const node = $pos.parent
  if (node.content.size > 0) return null

  const inTable = findParentNode((node) => node.type.name === 'table', $pos)
  if (inTable) return null

  const before = $pos.before()

  return Decoration.node(before, before + node.nodeSize, {
    class: 'prosekit-placeholder',
    'data-placeholder': placeholderText,
  })
}
