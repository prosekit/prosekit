import { Schema } from '@prosekit/pm/model'
import { Plugin, type EditorStateConfig } from '@prosekit/pm/state'

import { Facet } from '../editor/facet'
import { stateSlot } from '../editor/slots'
import { type StateConfigCallback } from '../types/editor'
import { type Extension } from '../types/extension'

/**
 * Adds a ProseMirror plugin to the editor.
 *
 * @param plugin - The ProseMirror plugin to add, or an array of plugins, or a
 * function that returns an array of plugins.
 *
 * @public
 */
export function addPlugin(
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
export type PluginFacetInput = (context: { schema: Schema }) => Plugin[]

/** @internal */
type PluginFacetOutput = StateConfigCallback

/** @internal */
export const pluginFacet = Facet.define<PluginFacetInput, PluginFacetOutput>({
  combine: (
    callbacks: Array<(context: { schema: Schema }) => Plugin[]>,
  ): StateConfigCallback => {
    return ({ schema }): EditorStateConfig => {
      const plugins = callbacks.flatMap((func) => func({ schema }))
      return { plugins }
    }
  },
  next: stateSlot,
})
