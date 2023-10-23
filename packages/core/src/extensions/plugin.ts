import { Schema } from '@prosekit/pm/model'
import { Plugin, type EditorStateConfig } from '@prosekit/pm/state'

import { Facet } from '../facets/facet'
import { stateFacet, type StatePayload } from '../facets/state'
import { type Extension } from '../types/extension'

/**
 * Adds a ProseMirror plugin to the editor.
 *
 * @param plugin - The ProseMirror plugin to add, or an array of plugins, or a
 * function that returns an array of plugins.
 *
 * @public
 */
export function definePlugin(
  plugin: Plugin | Plugin[] | ((context: { schema: Schema }) => Plugin[]),
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

/** @internal */
export type PluginPayload = (context: { schema: Schema }) => Plugin[]

/** @internal */
export const pluginFacet = Facet.define<PluginPayload, StatePayload>({
  convert: (
    callbacks: Array<(context: { schema: Schema }) => Plugin[]>,
  ): StatePayload => {
    return ({ schema }): EditorStateConfig => {
      const plugins = callbacks.flatMap((func) => func({ schema }))
      return { plugins }
    }
  },
  next: stateFacet,
})
