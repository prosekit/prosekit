import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'

import { createDropIndicatorPlugin } from './v3_drop-indicator-plugin'
import type { DragEventHandler } from './v3_types'

/**
 * @internal
 */
export function defineDropIndicatorPayload(
  payload: DropIndicatorPayload,
): PlainExtension {
  return defineFacetPayload(dropIndicatorFacet, [payload]) as PlainExtension
}

type DropIndicatorPayload = {
  enabled?: boolean
  width?: number
  onDrag?: DragEventHandler
}

const dropIndicatorFacet = defineFacet<DropIndicatorPayload, PluginPayload>({
  parent: pluginFacet,
  singleton: true,
  reducer: (payloads: DropIndicatorPayload[]): PluginPayload => {
    let enabled = payloads.some(p => p.enabled)
    if (!enabled) {
      return []
    }

    let width = payloads.map(p => p.width).find(w => w != null) ?? 2

    let dragEventHandlers: DragEventHandler[] = payloads.map(p => p.onDrag).filter(x => !!x)
    let dragEventHandler: DragEventHandler = mergeEventHandlers(dragEventHandlers)

    return createDropIndicatorPlugin({ width, onDrag: dragEventHandler })
  },
})

function mergeEventHandlers<T>(fns: Array<(options: T) => boolean | void>): (options: T) => boolean {
  return (options: T): boolean => {
    for (let fn of fns) {
      if (fn(options) === false) {
        return false
      }
    }
    return true
  }
}
