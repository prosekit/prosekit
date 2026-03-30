import type { PlainExtension } from '@prosekit/core'

import type { DragEventHandler } from '../drop-indicator/index.ts'
import { defineDropIndicator } from '../drop-indicator/index.ts'

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

const matchMap = new WeakMap<DataTransfer, boolean>()

const onDrag: DragEventHandler = ({ event }): boolean => {
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) return true

  let match: boolean

  if (matchMap.has(dataTransfer)) {
    match = matchMap.get(dataTransfer)!
  } else {
    // On Safari, accessing `dataTransfer.types` is more than 10x slower than in
    // Chrome. This becomes a bottleneck when `onDrag` is called frequently, so
    // we cache the result in a WeakMap.
    const types = dataTransfer.types
    match = types.includes('application/x-prosekit-table-handle-drag')
    matchMap.set(dataTransfer, match)
  }

  // Don't show the drop indicator when the drag event has
  // "application/x-prosekit-table-handle-drag" type.
  return !match
}
