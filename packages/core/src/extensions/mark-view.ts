import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { MarkViewConstructor } from '@prosekit/pm/view'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

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
