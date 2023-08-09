import { InputRule, inputRules } from '@prosekit/pm/inputrules'
import { Schema } from '@prosekit/pm/model'
import { Plugin } from '@prosekit/pm/state'

import { Facet } from '../editor/facet'
import { type Extension } from '../types/extension'

import { type PluginFacetInput, pluginFacet } from './plugin'

/**
 * @public
 */
export function addInputRule(
  rules: (context: { schema: Schema }) => InputRule[],
): Extension {
  return inputRuleFacet.extension([rules])
}

type InputRuleFacetInput = (context: { schema: Schema }) => InputRule[]
type InputRuleFacetOutput = PluginFacetInput

const inputRuleFacet = Facet.define<InputRuleFacetInput, InputRuleFacetOutput>({
  combine: (inputs: InputRuleFacetInput[]): InputRuleFacetOutput => {
    return (context): Plugin[] => {
      const rules: InputRule[] = inputs.flatMap((callback) => callback(context))
      return [inputRules({ rules })]
    }
  },
  next: pluginFacet,
})
