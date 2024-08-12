import type { Schema } from '@prosekit/pm/model'
import { type ProseMirrorPlugin, Plugin } from '@prosekit/pm/state'

import { ProseKitError } from '../error'
import { type Facet, defineFacet } from '../facets/facet'
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
  if (
    plugin instanceof Plugin ||
    (Array.isArray(plugin) && plugin.every((p) => p instanceof Plugin))
  ) {
    return definePluginPayload(() => plugin)
  }

  if (typeof plugin === 'function') {
    return definePluginPayload(plugin)
  }

  throw new TypeError('Invalid plugin')
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
      const plugins: ProseMirrorPlugin[] = []

      for (const payload of payloads) {
        if (payload instanceof Plugin) {
          plugins.push(payload)
        } else if (
          Array.isArray(payload) &&
          payload.every((p) => p instanceof Plugin)
        ) {
          plugins.push(...payload)
        } else if (typeof payload === 'function') {
          plugins.push(...[payload({ schema })].flat())
        } else {
          throw new ProseKitError('Invalid plugin')
        }
      }

      // In ProseMirror, the plugins at the beginning have a higher priority.
      // However, in ProseKit, the extensions at the end have a higher priority
      // because we want to easily override the default behaviors by appending
      // new extensions. Therefore, we need to reverse plugins here.
      plugins.reverse()
      return { plugins }
    }
  },
  parent: stateFacet,
})
