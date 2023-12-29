import { InputRule, inputRules } from '@prosekit/pm/inputrules'
import { Schema } from '@prosekit/pm/model'
import { Plugin } from '@prosekit/pm/state'

import { Facet } from '../facets/facet'
import { type Extension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

/**
 * Defines an input rule extension.
 *
 * @param rule - The ProseMirror input rule to add, or an array of input rules,
 * or a function that returns one or multiple input rules.
 *
 * @public
 *
 * @deprecated Use `prosekit/extensions/input-rule` instead.
 */
export function defineInputRule(
  rule:
    | InputRule
    | InputRule[]
    | ((context: { schema: Schema }) => InputRule | InputRule[]),
): Extension {
  if (rule instanceof InputRule) {
    return inputRuleFacet.extension([() => rule])
  }

  if (Array.isArray(rule) && rule.every((r) => r instanceof InputRule)) {
    return inputRuleFacet.extension([() => rule])
  }

  if (typeof rule === 'function') {
    return inputRuleFacet.extension([rule])
  }

  throw new TypeError('Invalid input rule')
}

type InputRulePayload = (context: { schema: Schema }) => InputRule | InputRule[]

const inputRuleFacet = Facet.define<InputRulePayload, PluginPayload>({
  convert: (inputs: InputRulePayload[]): PluginPayload => {
    return (context): Plugin[] => {
      const rules: InputRule[] = inputs.flatMap((callback) => callback(context))
      return [inputRules({ rules })]
    }
  },
  next: pluginFacet,
})
