import {
  defineFacet,
  defineFacetPayload,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'
import {
  PluginKey,
  ProseMirrorPlugin,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'

import { applyMarkRules } from './apply'
import type { MarkRuleOptions } from './types'

/**
 * A mark rule is something that can automatically apply marks to text if it
 * matches a certain pattern, and remove them if it doesn't match anymore.
 */
export function defineMarkRule(options: MarkRuleOptions): PlainExtension {
  return defineFacetPayload(markRuleFacet, [options]) as PlainExtension
}

const markRuleFacet = defineFacet<MarkRuleOptions, PluginPayload>({
  reduce: () => {
    let rules: MarkRuleOptions[] = []

    const plugin = new ProseMirrorPlugin({
      key: new PluginKey('prosekit-mark-rule'),
      appendTransaction: (
        transactions: readonly Transaction[],
        oldState: EditorState,
        newState: EditorState,
      ) => {
        return applyMarkRules(rules, transactions, oldState, newState)
      },
    })

    return function reducer(input) {
      rules = input
      return plugin
    }
  },

  parent: pluginFacet,
})
