import { definePlugin, isInCodeBlock } from '@prosekit/core'
import { ProseMirrorNode } from '@prosekit/pm/model'
import { EditorState, Plugin, PluginKey } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'


export interface PlaceholderOptions {
  /**
   * The placeholder text to use.
   */
  placeholder: string

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

function createPlaceholderPlugin(options: PlaceholderOptions): Plugin {
  return new Plugin({
    key: placeholderPluginKey,
    props: {
      decorations: (state) => {
        if (options.strategy === 'doc' && !isDocEmpty(state.doc)) {
          return null
        }

        if (isInCodeBlock(state.selection)) {
          return null
        }

        const placeholderText = options.placeholder
        const deco = createPlaceholderDecoration(state, placeholderText)
        if (!deco) {
          return null
        }

        return DecorationSet.create(state.doc, [deco])
      },
    },
  })
}

const placeholderPluginKey = new PluginKey('prosekit-placeholder')

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

  const before = $pos.before()

  return Decoration.node(before, before + node.nodeSize, {
    class: 'prosekit-placeholder',
    'data-placeholder': placeholderText,
  })
}
