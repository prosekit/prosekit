import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { DOMEventMap, EditorView } from '@prosekit/pm/view'

import { Facet } from '../../facets/facet'
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
    const events: Set<string> = new Set<string>()
    const handlersMap: Record<string, DOMEventHandler[]> = {}

    let plugin: ProseMirrorPlugin = new ProseMirrorPlugin({
      props: { handleDOMEvents: {} },
    })

    const updateHandlersMap = (payloads: DOMEventPayload[]) => {
      for (const callbacks of Object.values(handlersMap)) {
        callbacks.length = 0
      }
      groupEntries(payloads, handlersMap)
    }

    const updatePlugin = () => {
      const handlers = Object.fromEntries(
        Object.entries(handlersMap).map(([event, handlers]) => {
          return [
            event,
            (view: EditorView, event: Event) => {
              for (const handler of handlers) {
                if (handler(view, event)) {
                  return true
                }
              }
              return false
            },
          ]
        }),
      )
      plugin = new ProseMirrorPlugin({
        key: new PluginKey('prosekit-dom-event-handler'),
        props: {
          handleDOMEvents: handlers,
        },
      })
      return plugin
    }

    const update = (payloads: DOMEventPayload[]): PluginPayload => {
      const size = events.size

      for (const [event] of payloads) {
        events.add(event)
      }

      updateHandlersMap(payloads)
      if (events.size !== size) {
        const newPlugin = updatePlugin()
        return () => newPlugin
      } else {
        return () => []
      }
    }

    return {
      create: update,
      update: update,
    }
  },
  next: pluginFacet,
  singleton: true,
})
