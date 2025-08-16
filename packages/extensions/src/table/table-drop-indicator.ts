import type { PlainExtension } from '@prosekit/core'

import type { DragEventHandler } from '../drop-indicator'
import { defineDropIndicator } from '../drop-indicator'

/**
 * Hides the drop indicator when dragging a table column or row by using the
 * table handle.
 *
 * @internal
 */
export function defineTableDropIndicator(): PlainExtension {
  return defineDropIndicator({
    onDrag,
  })
}

const onDrag: DragEventHandler = ({ event }): boolean => {
  if (event.dataTransfer?.types.includes('application/x-prosekit-table-handle-drag')) {
    return false
  }

  return true
}
