import { type Attrs, NodeType, ProseMirrorNode } from '@prosekit/pm/model'
import { AllSelection, Selection } from '@prosekit/pm/state'
import { findWrapping, insertPoint } from '@prosekit/pm/transform'

import { commandSlot } from '../editor/slot'
import { type CommandCreator } from '../types/command'
import { type Extension } from '../types/extension'

export function addCommands<
  T extends Record<string, CommandCreator> = Record<string, CommandCreator>,
>(
  commands: T,
): Extension<{ COMMAND_ARGS: { [K in keyof T]: Parameters<T[K]> } }> {
  return commandSlot.extension([commands]) satisfies Extension
}

/**
 * Add some base commands
 *
 * @public
 */
export function addBaseCommands() {
  return addCommands({
    insertText: ({
      text,
      from,
      to,
    }: {
      text: string
      from?: number
      to?: number
    }) => {
      return (state, dispatch) => {
        if (text) {
          dispatch?.(state.tr.insertText(text, from, to))
        }
        return true
      }
    },

    insertNode: ({ node, pos }: { node: ProseMirrorNode; pos?: number }) => {
      return (state, dispatch) => {
        const insertPos = insertPoint(
          state.doc,
          pos ?? state.selection.to,
          node.type,
        )
        if (insertPos == null) return false

        if (dispatch) {
          const tr = state.tr.insert(insertPos, node)
          const $pos = tr.doc.resolve(insertPos)
          tr.setSelection(Selection.near($pos))
          dispatch(tr)
        }
        return true
      }
    },

    wrap: ({
      nodeType,
      attrs,
    }: {
      nodeType: NodeType
      attrs?: Attrs | null
    }) => {
      return (state, dispatch) => {
        const { $from, $to } = state.selection
        const range = $from.blockRange($to)
        if (!range) return false

        const wrapping = findWrapping(range, nodeType, attrs)
        if (!wrapping) return false

        dispatch?.(state.tr.wrap(range, wrapping))
        return true
      }
    },

    setBlockType: ({
      nodeType,
      attrs,
      from,
      to,
    }: {
      nodeType: NodeType
      attrs?: Attrs | null
      from?: number
      to?: number
    }) => {
      return (state, dispatch) => {
        from = from ?? state.selection.from
        to = from ?? state.selection.from
        dispatch?.(state.tr.setBlockType(from, to, nodeType, attrs))
        return true
      }
    },

    selectAll: () => {
      return (state, dispatch) => {
        dispatch?.(state.tr.setSelection(new AllSelection(state.doc)))
        return true
      }
    },
  })
}
