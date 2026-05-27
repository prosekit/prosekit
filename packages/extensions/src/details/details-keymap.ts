import { defineKeymap, type PlainExtension } from '@prosekit/core'
import { TextSelection, type Command } from '@prosekit/pm/state'

/**
 * Defines the keymap for details nodes.
 */
export function defineDetailsKeymap(): PlainExtension {
  return defineKeymap({
    Enter: enterInDetailsSummary,
  })
}

/**
 * When pressing Enter inside a `detailsSummary`, jump to the first content
 * block inside the `details` node. If no content block exists, insert one
 * first.
 */
const enterInDetailsSummary: Command = (state, dispatch) => {
  if (!state.selection.empty) return false

  const { $head } = state.selection
  if ($head.parent.type.name !== 'detailsSummary') return false

  let detailsDepth = -1
  for (let depth = $head.depth; depth >= 0; depth--) {
    if ($head.node(depth).type.name === 'details') {
      detailsDepth = depth
      break
    }
  }
  if (detailsDepth < 0) return false

  const detailsPos = $head.before(detailsDepth)
  const detailsNode = $head.node(detailsDepth)
  const contentNode = detailsNode.child(1)
  if (!contentNode || contentNode.type.name !== 'detailsContent') return false

  const contentPos = detailsPos + 1 + detailsNode.child(0).nodeSize

  if (dispatch) {
    const { tr } = state

    if (contentNode.childCount > 0) {
      tr.setSelection(TextSelection.near(tr.doc.resolve(contentPos + 2)))
    } else {
      const defaultBlockType = state.schema.topNodeType.contentMatch.defaultType
      if (!defaultBlockType) return false

      const block = defaultBlockType.createAndFill()
      if (!block) return false

      tr.insert(contentPos + 1, block)
      tr.setSelection(TextSelection.near(tr.doc.resolve(contentPos + 2)))
    }
    dispatch(tr.scrollIntoView())
  }

  return true
}
