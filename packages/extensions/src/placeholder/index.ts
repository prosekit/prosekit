import {
  definePlugin,
  isInCodeBlock,
  maybeRun,
  type PlainExtension,
} from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import {
  Plugin,
  PluginKey,
  type EditorState,
} from '@prosekit/pm/state'
import {
  Decoration,
  DecorationSet,
} from '@prosekit/pm/view'

import { findTable } from '../table'

export interface PlaceholderOptions {
  /**
   * The placeholder to use. It can be a static string or a function that
   * receives the current editor state and returns a string.
   */
  placeholder: string | ((state: EditorState) => string)

  /**
   * By default, the placeholder text will be shown whenever the current text
   * cursor is in an empty text node and it's not inside a code block or a
   * table node.
   *
   * If you only want to show the placeholder when the whole doc is empty, you
   * can set this option to 'doc'.
   *
   * You can also pass a function that receives the current editor state and
   * returns a boolean value to determine whether the placeholder should be
   * shown.
   *
   * @default 'block'
   */
  strategy?: 'doc' | 'block' | ((state: EditorState) => boolean)
}

/**
 * Add a placeholder text to the editor when the current block or document is
 * empty.
 */
export function definePlaceholder(options: PlaceholderOptions): PlainExtension {
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
        const strategyFn = typeof strategy === 'function'
          ? strategy
          : strategy === 'doc'
          ? docStrategy
          : defaultStrategy

        if (!strategyFn(state)) {
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

function defaultStrategy(state: EditorState): boolean {
  return !isInCodeBlock(state.selection) && !findTable(state.selection.$from)
}

function docStrategy(state: EditorState): boolean {
  return isDocEmpty(state.doc) && defaultStrategy(state)
}

function isDocEmpty(doc: ProseMirrorNode) {
  return doc.childCount <= 1 && !doc.firstChild?.content.size
}

function createPlaceholderDecoration(
  state: EditorState,
  placeholderText: string,
): Decoration | null {
  if (!placeholderText) return null

  const { selection } = state
  if (!selection.empty) return null

  const $pos = selection.$anchor
  const node = $pos.parent
  if (node.content.size > 0) return null

  const before = $pos.before()

  return Decoration.node(before, before + node.nodeSize, {
    'class': 'prosekit-placeholder',
    'data-placeholder': placeholderText,
  })
}
