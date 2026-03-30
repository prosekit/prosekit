import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { MarkViewConstructor } from '@prosekit/pm/view'

import { defineFacetPayload } from '../facets/facet-extension.ts'
import { defineFacet } from '../facets/facet.ts'
import type { Extension } from '../types/extension.ts'

import { pluginFacet, type PluginPayload } from './plugin.ts'

export interface MarkViewOptions {
  name: string
  constructor: MarkViewConstructor
}

export function defineMarkView(options: MarkViewOptions): Extension {
  return defineFacetPayload(markViewFacet, [options])
}

const markViewFacet = defineFacet<MarkViewOptions, PluginPayload>({
  reducer: (inputs: MarkViewOptions[]): PluginPayload => {
    const markViews: { [markName: string]: MarkViewConstructor } = {}

    for (const input of inputs) {
      if (!markViews[input.name]) {
        markViews[input.name] = input.constructor
      }
    }

    return () => [
      new ProseMirrorPlugin({
        key: new PluginKey('prosekit-mark-view'),
        props: { markViews },
      }),
    ]
  },
  parent: pluginFacet,
})
