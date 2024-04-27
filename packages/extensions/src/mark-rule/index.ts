import { Facet, pluginFacet, type PluginPayload } from '@prosekit/core'
import { EditorState, ProseMirrorPlugin, Transaction } from '@prosekit/pm/state'

import { applyMarkRules } from './apply'
import { MarkRule, type MarkRuleOptions } from './rule'

export type { MarkRuleOptions }

/**
 * A mark rule is something that can automatically apply marks to text if it
 * matches a certain pattern, and remove them if it doesn't match anymore.
 */
export function defineMarkRule(options: MarkRuleOptions) {
  return markRuleFacet.extension([new MarkRule(options)])
}

const markRuleFacet = Facet.define<MarkRule, PluginPayload>({
  converter: () => {
    let rules: MarkRule[] = []

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
      create: (inputs: MarkRule[]) => {
        rules = inputs
        return pluginFunc
      },
      update: (inputs: MarkRule[]) => {
        rules = inputs
        return null
      },
    }
  },

  next: pluginFacet,
})
