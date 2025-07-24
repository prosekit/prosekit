import type { PlainExtension } from '@prosekit/core'

import type { DragEventHandler } from '../drop-indicator'
import { defineDropIndicatorHandlers } from '../drop-indicator'

/**
 * Configures drop indicator to avoid unexpected drop point.
 *
 * We don't want to drag a list node and drop it as the first
 * child of another list node.
 *
 * @internal
 */
export function defineListDropIndicator(): PlainExtension {
  return defineDropIndicatorHandlers({
    onDrag,
  })
}

const onDrag: DragEventHandler = ({ view, pos }) => {
  const slice = view.dragging?.slice
  if (
    slice
    && slice.openStart === 0
    && slice.openEnd === 0
    && slice.content.childCount === 1
  ) {
    const node = slice.content.child(0)
    if (node.type.name === 'list') {
      const $pos = view.state.doc.resolve(pos)
      if ($pos.parent.type.name === 'list' && $pos.index() === 0) {
        return false
      }
    }
  }
}
