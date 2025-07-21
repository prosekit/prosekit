import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'

import { createDropIndicatorPlugin } from './v3_drop-indicator-plugin'
import type { DisableDropFunction } from './v3_types'

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
  disableDrop?: DisableDropFunction
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

    let disableDropFns = payloads.map(p => p.disableDrop).filter(x => !!x)

    let disableDrop = mergeDisableFunction(disableDropFns)

    return createDropIndicatorPlugin({ width, disableDrop })
  },
})

function mergeDisableFunction<T>(fns: Array<(options: T) => boolean>): (options: T) => boolean {
  return (options: T): boolean => {
    for (let fn of fns) {
      if (fn(options) === false) {
        return false
      }
    }
    return true
  }
}
