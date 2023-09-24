import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'

import { Facet } from '../editor/facet'
import { voidFunction } from '../types/void-function'

import { pluginFacet, type PluginFacetInput } from './plugin'

/**
 * @internal
 */
export function addEventHandler(options: { update?: VoidFunction }) {
  const updateHandler = options?.update ?? voidFunction
  return eventFacet.extension([updateHandler])
}

type EventFacetInput = VoidFunction
type EventFacetOutput = PluginFacetInput

const eventFacet = Facet.define<EventFacetInput, EventFacetOutput>({
  slot: () => {
    let updateHandlers: VoidFunction[] = []

    const plugin = new ProseMirrorPlugin({
      key: pluginKey,
      view: () => {
        // Do a first update to ensure the editor is in sync with the view
        updateHandlers.forEach((fn) => fn())

        return {
          update: (_view, _prevState) => {
            updateHandlers.forEach((fn) => fn())
          },
        }
      },
    })

    const pluginFunc = () => [plugin]

    return {
      create: (handlers: VoidFunction[]) => {
        updateHandlers = handlers
        return pluginFunc
      },
      update: (handlers: VoidFunction[]) => {
        updateHandlers = handlers
        return null
      },
    }
  },
  next: pluginFacet,
  single: true,
})

const pluginKey = new PluginKey('prosekit-event-handler')
