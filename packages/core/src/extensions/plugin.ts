import type { Schema } from '@prosekit/pm/model'
import { Plugin, type ProseMirrorPlugin } from '@prosekit/pm/state'

import { ProseKitError } from '../error'
import { defineFacet, type Facet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import { stateFacet, type StatePayload } from '../facets/state'
import type { PlainExtension } from '../types/extension'

/**
 * Adds a ProseMirror plugin to the editor.
 *
 * @param plugin - The ProseMirror plugin to add, or an array of plugins, or a
 * function that returns one or multiple plugins.
 *
 * @public
 */
export function definePlugin(
  plugin:
    | Plugin
    | Plugin[]
    | ((context: { schema: Schema }) => Plugin | Plugin[]),
): PlainExtension {
  return definePluginPayload(plugin)
}

function definePluginPayload(payload: PluginPayload): PlainExtension {
  return defineFacetPayload(pluginFacet, [payload]) as PlainExtension
}

/**
 * @internal
 */
export type PluginPayload =
  | Plugin
  | Plugin[]
  | ((context: { schema: Schema }) => Plugin | Plugin[])

/**
 * @internal
 */
export const pluginFacet: Facet<PluginPayload, StatePayload> = defineFacet({
  reducer: (payloads): StatePayload => {
    return ({ schema }) => {
      // An array of plugins from lower to higher priority.
      const plugins: ProseMirrorPlugin[] = []

      for (const payload of payloads) {
        if (payload instanceof Plugin) {
          plugins.push(payload)
        } else if (
          Array.isArray(payload)
          && payload.every((p) => p instanceof Plugin)
        ) {
          plugins.push(...payload)
        } else if (typeof payload === 'function') {
          plugins.push(...[payload({ schema })].flat())
        } else {
          throw new ProseKitError('Invalid plugin')
        }
      }

      // An array of plugins from higher to lower priority. This matches the
      // order of plugins required by ProseMirror.
      const reversedPlugins = [...plugins].reverse()

      return { plugins: reversedPlugins }
    }
  },
  parent: stateFacet,
})
