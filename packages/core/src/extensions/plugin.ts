import { Schema } from '@prosekit/pm/model'
import { Plugin } from '@prosekit/pm/state'

import { Facet } from '../facets/facet'
import { stateFacet, type StatePayload } from '../facets/state'
import { type Extension } from '../types/extension'

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
): Extension {
  if (plugin instanceof Plugin) {
    return pluginFacet.extension([() => [plugin]])
  }

  if (Array.isArray(plugin) && plugin.every((p) => p instanceof Plugin)) {
    return pluginFacet.extension([() => plugin])
  }

  if (typeof plugin === 'function') {
    return pluginFacet.extension([plugin])
  }

  throw new TypeError('Invalid plugin')
}

/**
 * @internal
 */
export type PluginPayload = (context: { schema: Schema }) => Plugin | Plugin[]

/**
 * @internal
 */
export const pluginFacet = Facet.define<PluginPayload, StatePayload>({
  converter: () => {
    let inputs: PluginPayload[] = []

    const output: StatePayload = ({ schema }) => {
      const plugins = inputs.flatMap((func) => func({ schema }))
      return { plugins }
    }

    return {
      create: (payloads: PluginPayload[]) => {
        inputs = payloads
        return output
      },
      update: (payloads: PluginPayload[]) => {
        inputs = payloads
        return output
      },
    }
  },
  next: stateFacet,
})
