import { Facet, pluginFacet, type PluginPayload } from '@prosekit/core'
import { EditorState, ProseMirrorPlugin, Transaction } from '@prosekit/pm/state'

import { applyMarkRules } from './apply'
import type { MarkRule, MarkRuleOptions } from './types'

/**
 * A mark rule is something that can automatically apply marks to text if it
 * matches a certain pattern, and remove them if it doesn't match anymore.
 */
export function defineMarkRule(options: MarkRuleOptions) {
  const { regex, type, attrs } = options
  const getAttrs = attrs && typeof attrs === 'object' ? () => attrs : attrs

  return markRuleFacet.extension([{ regex, type, getAttrs }])
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
