import {
  Facet,
  pluginFacet,
  type Extension,
  type PluginFacetInput,
} from '@prosekit/core'

import { createAutocompletePlugin } from './plugin'
import { AutocompleteRule, type MatchHandler } from './rule'

export { AutocompleteRule, type MatchHandler }

export function defineAutocomplete(rule: AutocompleteRule): Extension {
  return autocompleteFacet.extension([rule])
}

const autocompleteFacet = Facet.define<AutocompleteRule, PluginFacetInput>({
  slot: () => {
    let localRules: AutocompleteRule[] = []
    const getRules = () => localRules

    return {
      create: (rules) => {
        localRules = rules
        const plugin = createAutocompletePlugin({ getRules })
        return () => [plugin]
      },
      update: (rules) => {
        localRules = rules
        return null
      },
    }
  },
  next: pluginFacet,
})
