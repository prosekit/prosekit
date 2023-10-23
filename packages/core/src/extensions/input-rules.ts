import { InputRule, inputRules } from '@prosekit/pm/inputrules'
import { Schema } from '@prosekit/pm/model'
import { Plugin } from '@prosekit/pm/state'

import { Facet } from '../facets/facet'
import { type Extension } from '../types/extension'

import { type PluginPayload, pluginFacet } from './plugin'

/**
 * @public
 */
export function defineInputRule(
  rules: (context: { schema: Schema }) => InputRule[],
): Extension {
  return inputRuleFacet.extension([rules])
}

type InputRulePayload = (context: { schema: Schema }) => InputRule[]

const inputRuleFacet = Facet.define<InputRulePayload, PluginPayload>({
  convert: (inputs: InputRulePayload[]): PluginPayload => {
    return (context): Plugin[] => {
      const rules: InputRule[] = inputs.flatMap((callback) => callback(context))
      return [inputRules({ rules })]
    }
  },
  next: pluginFacet,
})
