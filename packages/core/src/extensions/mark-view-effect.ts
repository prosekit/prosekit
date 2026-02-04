import { isNotNullish } from '@ocavue/utils'
import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { MarkViewConstructor } from '@prosekit/pm/view'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import type { Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

/**
 * @internal
 */
export type MarkViewFactoryOptions<T> = {
  group: string
  factory: (args: T) => MarkViewConstructor
}

/**
 * @internal
 */
export type MarkViewComponentOptions<T> = {
  group: string
  name: string
  args: T
}

type MarkViewFactoryInput = [
  MarkViewFactoryOptions<any> | null,
  MarkViewComponentOptions<any> | null,
]

/**
 * @internal
 */
export function defineMarkViewFactory<T>(
  options: MarkViewFactoryOptions<T>,
): Extension {
  const input: MarkViewFactoryInput = [options, null]
  return defineFacetPayload(markViewFactoryFacet, [input])
}

/**
 * @internal
 */
export function defineMarkViewComponent<T>(
  options: MarkViewComponentOptions<T>,
): Extension {
  const input: MarkViewFactoryInput = [null, options]
  return defineFacetPayload(markViewFactoryFacet, [input])
}

const isServer = typeof window === 'undefined'

const markViewFactoryFacet = defineFacet<MarkViewFactoryInput, PluginPayload>({
  reducer: (inputs: MarkViewFactoryInput[]): PluginPayload => {
    // Don't register mark views on the server
    if (isServer) return []

    const markViews: { [markName: string]: MarkViewConstructor } = {}

    const factories = inputs.map((x) => x[0]).filter(isNotNullish)
    const options = inputs.map((x) => x[1]).filter(isNotNullish)

    for (const { group, name, args } of options) {
      const factory = factories.find((factory) => factory.group === group)
      if (!factory) continue
      markViews[name] = factory.factory(args)
    }

    return () => [
      new ProseMirrorPlugin({
        key: new PluginKey('prosekit-mark-view-effect'),
        props: { markViews },
      }),
    ]
  },
  parent: pluginFacet,
})
