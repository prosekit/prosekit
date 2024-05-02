import { Facet, pluginFacet, type PluginPayload } from '@prosekit/core'
import { EditorState, ProseMirrorPlugin, Transaction } from '@prosekit/pm/state'

import { applyMarkRules } from './apply'
import type { MarkRuleOptions } from './types'

/**
 * A mark rule is something that can automatically apply marks to text if it
 * matches a certain pattern, and remove them if it doesn't match anymore.
 */
export function defineMarkRule(options: MarkRuleOptions) {
  return markRuleFacet.extension([options])
}

const markRuleFacet = Facet.define<MarkRuleOptions, PluginPayload>({
  converter: () => {
    let rules: MarkRuleOptions[] = []

    const plugin = new ProseMirrorPlugin({
      appendTransaction: (
        transactions: readonly Transaction[],
        oldState: EditorState,
        newState: EditorState,
      ) => {
        return applyMarkRules(rules, transactions, oldState, newState)
      },
    })
    const pluginFunc = () => [plugin]

    return {
      create: (inputs: MarkRuleOptions[]) => {
        rules = inputs
        return pluginFunc
      },
      update: (inputs: MarkRuleOptions[]) => {
        rules = inputs
        return null
      },
    }
  },

  next: pluginFacet,
})
