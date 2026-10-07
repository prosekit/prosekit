import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { DOMEventMap, EditorView } from '@prosekit/pm/view'

import { defineFacetPayload } from '../../facets/facet-extension.ts'
import { defineFacet, type Facet } from '../../facets/facet.ts'
import type { PlainExtension } from '../../types/extension.ts'
import type { Setter } from '../../types/setter.ts'
import { groupEntries } from '../../utils/array-grouping.ts'
import { combineEventHandlers } from '../../utils/combine-event-handlers.ts'
import { pluginFacet, type PluginPayload } from '../plugin.ts'

/**
 * A function to handle the events fired on the editable DOM element. Returns
 * `true` to indicate that it handled the given event. When returning `true`,
 * you are responsible for calling `event.preventDefault()` yourself (or not, if
 * you want to allow the default behavior).
 */
export type DOMEventHandler<Event extends keyof DOMEventMap = string> = (
  view: EditorView,
  event: DOMEventMap[Event],
) => boolean | void

/**
 * @internal
 */
export function defineDomEventFacetPayload(
  ...payloads: DOMEventPayload[]
): PlainExtension {
  return defineFacetPayload<DOMEventPayload>(
    domEventFacet,
    payloads,
  ) as PlainExtension
}

/**
 * Register a new event handler for the given event type.
 */
export function defineDOMEventHandler<Event extends keyof DOMEventMap = string>(
  event: Event,
  handler: DOMEventHandler<Event>,
): PlainExtension {
  return defineDomEventFacetPayload([
    event as string,
    handler as DOMEventHandler,
  ])
}

/**
 * @internal
 */
type DOMEventPayload = [event: string, handler: DOMEventHandler]

/**
 * @internal
 */
const domEventFacet: Facet<DOMEventPayload, PluginPayload> = defineFacet(
  {
    reduce: () => {
      const setHandlersMap = new Map<string, Setter<DOMEventHandler[]>>()
      const combinedHandlers: Record<string, DOMEventHandler> = {}

      let plugin: ProseMirrorPlugin | undefined

      const update = (payloads: DOMEventPayload[]): void => {
        let hasNewEvent = false

        for (const [event] of payloads) {
          if (!setHandlersMap.has(event)) {
            hasNewEvent = true
            const [setHandlers, combinedHandler] = combineEventHandlers<DOMEventHandler>()
            setHandlersMap.set(event, setHandlers)
            combinedHandlers[event] = combinedHandler
          }
        }

        const map: Record<string, DOMEventHandler[] | undefined> = groupEntries<DOMEventMap>(payloads)
        for (const [event, setHandlers] of setHandlersMap) {
          const handlers = map[event] ?? []
          setHandlers(handlers)
        }

        if (hasNewEvent) {
          plugin = new ProseMirrorPlugin({
            key: new PluginKey('prosekit-dom-event-handler'),
            props: { handleDOMEvents: combinedHandlers },
          })
        }
      }

      return function reducer(inputs) {
        update(inputs)
        return plugin ?? []
      }
    },
    parent: pluginFacet,
    singleton: true,
  },
)
