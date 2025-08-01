import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'

import { createDropIndicatorPlugin } from './drop-indicator-plugin'
import type {
  DragEventHandler,
  ShowHandler,
} from './types'

/**
 * @internal
 */
export function defineDropIndicatorPayload(
  payload: DropIndicatorPayload,
): PlainExtension {
  return defineFacetPayload(dropIndicatorFacet, [payload]) as PlainExtension
}

/**
 * @internal
 */
export interface DropIndicatorPayload {
  /**
   * A callback that is called when the drop indicator should be shown.
   */
  onShow?: ShowHandler

  /**
   * A callback that is called when the drop indicator should be hidden.
   */
  onHide?: VoidFunction

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
    let showHandlers = payloads.map(p => p.onShow).filter(x => !!x)
    let hideHandlers = payloads.map(p => p.onHide).filter(x => !!x)
    let dragHandlers = payloads.map(p => p.onDrag).filter(x => !!x)

    let showHandler: ShowHandler = (options) => {
      for (let fn of showHandlers) {
        fn(options)
      }
    }

    let hideHandler: VoidFunction = () => {
      for (let fn of hideHandlers) {
        fn()
      }
    }

    let dragHandler: DragEventHandler = (options): boolean => {
      for (let fn of dragHandlers) {
        if (fn(options) === false) return false
      }
      return true
    }

    if (showHandlers.length === 0) {
      // No `onShow` event handler, so we don't need to create a plugin.
      return []
    }

    return createDropIndicatorPlugin({
      onDrag: dragHandler,
      onShow: showHandler,
      onHide: hideHandler,
    })
  },
})
