import type { Extension, PluginPayload } from '@prosekit/core'
import { defineFacet, defineFacetPayload, pluginFacet } from '@prosekit/core'

import { createAutocompletePlugin } from './plugin'
import { AutocompleteRule, type MatchHandler } from './rule'

export { AutocompleteRule, type MatchHandler }

export function defineAutocomplete(rule: AutocompleteRule): Extension {
  return defineFacetPayload(autocompleteFacet, [rule])
}

const autocompleteFacet = defineFacet<AutocompleteRule, PluginPayload>({
  reduce: () => {
    let rules: AutocompleteRule[] = []
    const getRules = () => rules
    const plugin = createAutocompletePlugin({ getRules })

    return function reducer(inputs) {
      rules = inputs
      return plugin
    }
  },
  parent: pluginFacet,
  singleton: true,
})
