import { isNotNullish } from '@ocavue/utils'
import { defineFacet, defineFacetPayload, pluginFacet, type PlainExtension, type PluginPayload } from '@prosekit/core'
import type { DragEventHandler, DropIndicatorPluginOptions, ShowHandler } from 'prosemirror-drop-indicator'
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
    const showHandlers = payloads.map(p => p.onShow).filter(isNotNullish)
    const hideHandlers = payloads.map(p => p.onHide).filter(isNotNullish)
    const dragHandlers = payloads.map(p => p.onDrag).filter(isNotNullish)

    const showHandler: ShowHandler = (options) => {
      for (const fn of showHandlers) {
        fn(options)
      }
    }

    const hideHandler: VoidFunction = () => {
      for (const fn of hideHandlers) {
        fn()
      }
    }

    const dragHandler: DragEventHandler = (options): boolean => {
      for (const fn of dragHandlers) {
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
