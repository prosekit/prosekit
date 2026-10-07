import { defineFacet, defineFacetPayload, pluginFacet, type Extension, type PluginPayload } from '@prosekit/core'
import type { Transaction } from '@prosekit/pm/state'

import { setTrMeta } from './autocomplete-helpers.ts'
import { createAutocompletePlugin } from './autocomplete-plugin.ts'
import type { AutocompleteRule } from './autocomplete-rule.ts'

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

/**
 * Tags a transaction so that, when it is applied, autocomplete re-scans the text
 * before the cursor and opens the menu if a rule matches. Returns the same
 * transaction, so it can be chained.
 *
 * Autocomplete normally only opens while the user is typing. Use this to open a
 * slash, mention, or tag menu imperatively, for example after inserting the
 * trigger text in your own command, without dispatching a second transaction. It
 * is intended for an empty (cursor) selection.
 */
export function triggerAutocomplete(tr: Transaction): Transaction {
  return setTrMeta(tr, { type: 'scan' })
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
