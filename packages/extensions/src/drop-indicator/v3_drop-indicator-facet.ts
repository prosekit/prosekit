import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  ProseKitError,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'

import { createDropIndicatorPlugin } from './v3_drop-indicator-plugin'
import type {
  DragEventHandler,
  DrawEventHandler,
} from './v3_types'

/**
 * @internal
 */
export function defineDropIndicatorPayload(
  payload: DropIndicatorPayload,
): PlainExtension {
  return defineFacetPayload(dropIndicatorFacet, [payload]) as PlainExtension
}

export interface DropIndicatorPayload {
  /**
   * The precise width of the drop indicator in pixels.
   *
   * @default 2
   */
  width?: number

  /**
   * A callback that is called when the drop indicator should be shown.
   */
  onDraw?: DrawEventHandler

  /**
   * A callback that is called when the `dragover` event is fired. You can
   * return `false` to disable the current drop point and thus hide the drop
   * indicator.
   */
  onDrag?: DragEventHandler
}

const dropIndicatorFacet = defineFacet<DropIndicatorPayload, PluginPayload>({
  parent: pluginFacet,
  singleton: true,
  reducer: (payloads: DropIndicatorPayload[]): PluginPayload => {
    let width = payloads.map(p => p.width).find(w => w != null) ?? 2

    let drawEventHandlers: DrawEventHandler[] = payloads.map(p => p.onDraw).filter(x => !!x)
    if (drawEventHandlers.length > 1) {
      throw new ProseKitError('Unexpected multiple `onDraw` event handlers.')
    }
    if (drawEventHandlers.length === 0) {
      // No `onDraw` event handler, so we don't need to create a plugin.
      return []
    }
    const drawEventHandler = drawEventHandlers[0]

    let dragEventHandlers: DragEventHandler[] = payloads.map(p => p.onDrag).filter(x => !!x)
    let dragEventHandler: DragEventHandler = (options): boolean => {
      for (let fn of dragEventHandlers) {
        if (fn(options) === false) return false
      }
      return true
    }

    return createDropIndicatorPlugin({ width, onDrag: dragEventHandler, onDraw: drawEventHandler })
  },
})
