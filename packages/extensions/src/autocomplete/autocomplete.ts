import { defineFacet, defineFacetPayload, pluginFacet, type Extension, type PluginPayload } from '@prosekit/core'

import { createAutocompletePlugin } from './autocomplete-plugin'
import type { AutocompleteRule } from './autocomplete-rule'

/**
 * Defines an autocomplete extension that executes logic when the text before
 * the cursor matches the given regular expression.
 *
 * When a match is found, an inline decoration is applied to the matched text
 * with the class `prosekit-autocomplete-match` and a `data-autocomplete-match-text`
 * attribute containing the full matched string.
 */
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
