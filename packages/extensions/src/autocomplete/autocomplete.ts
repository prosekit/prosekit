import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type Extension,
  type PluginPayload,
} from '@prosekit/core'

import { createAutocompletePlugin } from './autocomplete-plugin'
import type { AutocompleteRule } from './autocomplete-rule'

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
