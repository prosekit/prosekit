import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { DOMEventMap, EditorView } from '@prosekit/pm/view'

import { Facet } from '../../facets/facet'
import type { Setter } from '../../types/setter'
import { combineEventHandlers } from '../../utils/combine-event-handlers'
import { groupEntries } from '../../utils/group-entries'
import { pluginFacet, type PluginPayload } from '../plugin'

/**
 * A function to handle the events fired on the editable DOM element. Returns
 * `true` to indicate that it handled the given event. you are responsible for
 * calling `preventDefault` yourself (or not, if you want to allow the default
 * behavior).
 *
 * @public
 */
export type DOMEventHandler<Event extends keyof DOMEventMap = string> = (
  view: EditorView,
  event: DOMEventMap[Event],
) => boolean | void

/**
 * Register a new event handler for the given event type.
 *
 * @public
 */
export function defineDOMEventHandler<Event extends keyof DOMEventMap = string>(
  event: Event,
  handler: DOMEventHandler<Event>,
) {
  return domEventFacet.extension([
    [event as string, handler as DOMEventHandler],
  ])
}

/**
 * @internal
 */
export type DOMEventPayload = [event: string, handler: DOMEventHandler]

/**
 * @internal
 */
export const domEventFacet = Facet.define<DOMEventPayload, PluginPayload>({
  converter: () => {
    const setHandlersMap: Record<string, Setter<DOMEventHandler[]>> = {}
    const combinedHandlerMap: Record<string, DOMEventHandler> = {}

    const update = (payloads: DOMEventPayload[]) => {
      let hasNewEvent = false

      for (const [event] of payloads) {
        if (!setHandlersMap[event]) {
          hasNewEvent = true
          const [setHandlers, combinedHandler] =
            combineEventHandlers<DOMEventHandler>()
          setHandlersMap[event] = setHandlers
          combinedHandlerMap[event] = combinedHandler
        }
      }

      const map: Record<string, DOMEventHandler[] | undefined> =
        groupEntries<DOMEventMap>(payloads)
      for (const [event, handlers] of Object.entries(map)) {
        const setHandlers = setHandlersMap[event]
        setHandlers(handlers ?? [])
      }

      if (hasNewEvent) {
        return new ProseMirrorPlugin({
          key: new PluginKey('prosekit-dom-event-handler'),
          props: { handleDOMEvents: combinedHandlerMap },
        })
      } else {
        return null
      }
    }

    return {
      create: (payloads) => {
        const plugin = update(payloads)
        return plugin ? () => plugin : () => []
      },
      update: (payloads) => {
        const plugin = update(payloads)
        return plugin ? () => plugin : null
      },
    }
  },
  next: pluginFacet,
  singleton: true,
})
