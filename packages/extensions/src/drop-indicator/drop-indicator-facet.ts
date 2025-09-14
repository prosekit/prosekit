import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'
import type {
  DragEventHandler,
  DropIndicatorPluginOptions,
  ShowHandler,
} from 'prosemirror-drop-indicator'
import { createDropIndicatorPlugin } from 'prosemirror-drop-indicator'

/**
 * @internal
 */
export function defineDropIndicatorPayload(
  payload: DropIndicatorPluginOptions,
): PlainExtension {
  return defineFacetPayload(dropIndicatorFacet, [payload]) as PlainExtension
}

const dropIndicatorFacet = defineFacet<DropIndicatorPluginOptions, PluginPayload>({
  parent: pluginFacet,
  singleton: true,
  reducer: (payloads: DropIndicatorPluginOptions[]): PluginPayload => {
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
