import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { DOMEventMap, EditorView } from '@prosekit/pm/view'

import { defineFacet, type Facet } from '../../facets/facet'
import { defineFacetPayload } from '../../facets/facet-extension'
import type { PlainExtension } from '../../types/extension'
import type { Setter } from '../../types/setter'
import { groupEntries } from '../../utils/array-grouping'
import { combineEventHandlers } from '../../utils/combine-event-handlers'
import { pluginFacet, type PluginPayload } from '../plugin'

/**
 * A function to handle the events fired on the editable DOM element. Returns
 * `true` to indicate that it handled the given event. When returning `true`,
 * you are responsible for calling `event.preventDefault()` yourself (or not, if
 * you want to allow the default behavior).
 *
 * @public
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
 *
 * @public
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
      const setHandlersMap: Record<string, Setter<DOMEventHandler[]>> = {}
      const combinedHandlerMap: Record<string, DOMEventHandler> = {}

      let plugin: ProseMirrorPlugin | undefined

      const update = (payloads: DOMEventPayload[]): void => {
        let hasNewEvent = false

        for (const [event] of payloads) {
          if (!setHandlersMap[event]) {
            hasNewEvent = true
            const [setHandlers, combinedHandler] = combineEventHandlers<DOMEventHandler>()
            setHandlersMap[event] = setHandlers
            combinedHandlerMap[event] = combinedHandler
          }
        }

        const map: Record<string, DOMEventHandler[] | undefined> = groupEntries<DOMEventMap>(payloads)
        for (const [event, setHandlers] of Object.entries(setHandlersMap)) {
          const handlers = map[event] ?? []
          setHandlers(handlers)
        }

        if (hasNewEvent) {
          plugin = new ProseMirrorPlugin({
            key: new PluginKey('prosekit-dom-event-handler'),
            props: { handleDOMEvents: combinedHandlerMap },
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
