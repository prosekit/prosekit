import type { PlainExtension } from '@prosekit/core'

import {
  defineDropIndicator,
  type CanDropPredicate,
} from '../drop-indicator'

/**
 * Configures drop indicator to avoid unexpected drop point.
 *
 * We don't want to drag a list node and drop it as the first
 * child of another list node.
 *
 * @internal
 */
export function defineListDropIndicator(): PlainExtension {
  return defineDropIndicator({
    canDrop,
  })
}

const canDrop: CanDropPredicate = ({ view, pos }) => {
  const slice = view.dragging?.slice
  if (slice && slice.openStart === 0 && slice.openEnd === 0 && slice.content.childCount === 1) {
    const node = slice.content.firstChild

    if (node && node.type.name === 'list') {
      const $pos = view.state.doc.resolve(pos)

      if ($pos.parent.type.name === 'list') {
        if ($pos.index() === 0) {
          return false
        }
      }
    }
  }

  return true
}
