import { PlainExtension } from "@prosekit/core";
import { EnterRule, EnterRuleHandler, EnterRuleHandlerOptions, TextBlockEnterRuleOptions } from "prosemirror-enter-rules";
/**
 * Options for {@link defineEnterRule}.
 */
interface EnterRuleOptions extends EnterRule {}
/**
 * Options for {@link defineTextBlockEnterRule}.
 */
interface TextBlockEnterRuleOptions$1 extends TextBlockEnterRuleOptions {}
/**
 * Defines an enter rule. An enter rule applies when the text directly in front of
 * the cursor matches `regex` and user presses Enter. The `regex` should end
 * with `$`.
 *
 * @param options
 */
declare function defineEnterRule(options: EnterRuleOptions): PlainExtension;
/**
 * Defines an enter rule that replaces the matched text with a block node.
 *
 * See also {@link defineEnterRule}.
 *
 * @param options
 */
declare function defineTextBlockEnterRule(options: TextBlockEnterRuleOptions$1): PlainExtension;
export { defineEnterRule as a, TextBlockEnterRuleOptions$1 as i, EnterRuleHandlerOptions as n, defineTextBlockEnterRule as o, EnterRuleOptions as r, EnterRuleHandler as t };
//# sourceMappingURL=index2.d.ts.map