import { defineFacet, defineFacetPayload, pluginFacet, type PlainExtension, type PluginPayload } from '@prosekit/core'
import {
  createEnterRulePlugin,
  createTextBlockEnterRule,
  type EnterRule,
  type EnterRuleHandler,
  type EnterRuleHandlerOptions,
  type TextBlockEnterRuleOptions as TextBlockEnterRuleOptionsBase,
} from 'prosemirror-enter-rules'

export type { EnterRuleHandler, EnterRuleHandlerOptions }

/**
 * Options for {@link defineEnterRule}.
 *
 * @public
 */
export interface EnterRuleOptions extends EnterRule {}

/**
 * Options for {@link defineTextBlockEnterRule}.
 *
 * @public
 */
export interface TextBlockEnterRuleOptions extends TextBlockEnterRuleOptionsBase {}

/**
 * Defines an enter rule. An enter rule applies when the text directly in front of
 * the cursor matches `regex` and user presses Enter. The `regex` should end
 * with `$`.
 *
 * @param options
 *
 * @public
 */
export function defineEnterRule(options: EnterRuleOptions): PlainExtension {
  return defineFacetPayload(enterRuleFacet, [options]) as PlainExtension
}

/**
 * Defines an enter rule that replaces the matched text with a block node.
 *
 * See also {@link defineEnterRule}.
 *
 * @param options
 *
 * @public
 */
export function defineTextBlockEnterRule(options: TextBlockEnterRuleOptions): PlainExtension {
  return defineEnterRule(createTextBlockEnterRule(options))
}

const enterRuleFacet = defineFacet<EnterRule, PluginPayload>({
  reducer: (rules: EnterRule[]): PluginPayload => {
    return createEnterRulePlugin({ rules })
  },

  parent: pluginFacet,
})
