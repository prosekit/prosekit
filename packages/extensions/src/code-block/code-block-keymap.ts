import {
  defaultBlockAt,
  defineKeymap,
  type PlainExtension,
} from '@prosekit/core'
import {
  TextSelection,
  type Command,
} from '@prosekit/pm/state'

/**
 * Defines the keymap for code blocks.
 */
export function defineCodeBlockKeymap(): PlainExtension {
  return defineKeymap({
    Enter: existCodeBlock,
  })
}

/**
 * Exit a code block and insert a default block below if the cursor is at the
 * end of the code block and the code block is ended with two new lines.
 */
const existCodeBlock: Command = (state, dispatch) => {
  if (!state.selection.empty) {
    return false
  }

  const { $head } = state.selection
  const parent = $head.parent
  if (
    parent.isTextblock
    && parent.type.spec.code
    && $head.parentOffset === parent.content.size
    && parent.textContent.endsWith('\n\n')
  ) {
    const grandParent = $head.node(-1)
    const insertIndex = $head.indexAfter(-1)
    const type = defaultBlockAt(grandParent.contentMatchAt(insertIndex))

    if (!type || !grandParent.canReplaceWith(insertIndex, insertIndex, type)) {
      return false
    }

    if (dispatch) {
      const { tr } = state
      tr.delete($head.pos - 2, $head.pos)
      const pos = tr.selection.$head.after()
      const node = type.createAndFill()
      if (node) {
        tr.replaceWith(pos, pos, node)
        tr.setSelection(TextSelection.near(tr.doc.resolve(pos), 1))
        dispatch(tr.scrollIntoView())
      }
    }

    return true
  }

  return false
}
