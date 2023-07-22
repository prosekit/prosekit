import {
  Facet,
  pluginFacet,
  type Extension,
  type PluginFacetInput,
} from '@prosekit/core'

import { createAutocompletePlugin } from './plugin'
import { AutocompleteRule, type MatchHandler } from './rule'

export { AutocompleteRule, type MatchHandler }

export function addAutocomplete(rule: AutocompleteRule): Extension {
  return autocompleteFacet.extension([rule])
}

const autocompleteFacet = Facet.define<AutocompleteRule, PluginFacetInput>({
  combine: (rules: AutocompleteRule[]): PluginFacetInput => {
    return () => [createAutocompletePlugin({ rules })]
  },
  next: pluginFacet,
})
