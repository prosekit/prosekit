import { Schema } from '@prosekit/pm/model'
import { type EditorStateConfig, Plugin } from '@prosekit/pm/state'

import { Facet } from '../editor/facet'
import { stateSlot } from '../editor/slot'
import { type StateConfigCallback } from '../types/editor'
import { type Extension } from '../types/extension'

/** @public */
export interface PluginOptions {
  plugins: Plugin[] | ((context: { schema: Schema }) => Plugin[])
}

// TODO: remove object
/** @public */
export function addPlugin({ plugins }: PluginOptions): Extension {
  if (typeof plugins === 'function') {
    return pluginFacet.extension([plugins])
  } else if (Array.isArray(plugins)) {
    return pluginFacet.extension([() => plugins])
  } else {
    throw new TypeError('plugins must be a function or an array')
  }
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
