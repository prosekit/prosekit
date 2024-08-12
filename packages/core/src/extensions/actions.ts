import { ProseMirrorNode } from '@prosekit/pm/model'
import { Selection, Transaction, type Command } from '@prosekit/pm/state'
import { insertPoint } from '@prosekit/pm/transform'
import type { EditorView } from '@prosekit/pm/view'

type Action = (options: { tr: Transaction; view?: EditorView }) => boolean

export function applyAction(operator: Action): Command {
  return function applyActionCommand(state, dispatch, view) {
    const tr = state.tr
    if (operator({ tr, view })) {
      dispatch?.(tr)
      return true
    }
    return false
  }
}

export function insertNodeAction({
  node,
  pos,
}: {
  node: ProseMirrorNode
  pos?: number
}): Action {
  return ({ tr }) => {
    const insertPos = insertPoint(tr.doc, pos ?? tr.selection.to, node.type)
    if (insertPos == null) {
      return false
    }

    tr.insert(insertPos, node)
    const $pos = tr.doc.resolve(insertPos)
    tr.setSelection(Selection.near($pos))
    return true
  }
}
