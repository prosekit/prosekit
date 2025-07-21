import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'

import { createDropIndicatorPlugin } from './v3_drop-indicator-plugin'
import type {
  CanDropPredicate,
  DropIndicatorOptions,
} from './v3_types'

/**
 * @internal
 */
export type DropIndicatorExtension = PlainExtension

/**
 * Show up a decoration at the drop position when something is dragged over the
 * editor.
 *
 * You can add this extension multiple times. If any extension has `canDrop`
 * callback defined, and it returns `false`, then the drop point will be
 * discard.
 *
 * @param options
 *
 * @public
 */
export function defineDropIndicator(
  options: DropIndicatorOptions,
): DropIndicatorExtension {
  return defineFacetPayload(facet, [options]) as PlainExtension
}

const facet = defineFacet<DropIndicatorOptions, PluginPayload>({
  parent: pluginFacet,
  singleton: true,
  reducer: (payloads: DropIndicatorOptions[]): PluginPayload => {
    let canDropPredicates: CanDropPredicate[] = []
    let width: number | undefined

    for (let payload of payloads) {
      if (payload.width != null) {
        width = payload.width
      }
      if (payload.canDrop != null) {
        canDropPredicates.push(payload.canDrop)
      }
    }

    let canDrop: CanDropPredicate = (options) => {
      for (let canDrop of canDropPredicates) {
        if (!canDrop(options)) {
          return false
        }
      }
      return true
    }

    return createDropIndicatorPlugin({ canDrop, width: width ?? 2 })
  },
})
