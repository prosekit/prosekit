import { PlainExtension } from "@prosekit/core";
import { EnterRule, EnterRuleHandler, EnterRuleHandlerOptions, TextBlockEnterRuleOptions as TextBlockEnterRuleOptions$1 } from "prosemirror-enter-rules";
/**
 * Options for {@link defineEnterRule}.
 */
export interface EnterRuleOptions extends EnterRule {}
/**
 * Options for {@link defineTextBlockEnterRule}.
 */
export interface TextBlockEnterRuleOptions extends TextBlockEnterRuleOptions$1 {}
/**
 * Defines an enter rule. An enter rule applies when the text directly in front of
 * the cursor matches `regex` and user presses Enter. The `regex` should end
 * with `$`.
 *
 * @param options
 */
export declare function defineEnterRule(options: EnterRuleOptions): PlainExtension;
/**
 * Defines an enter rule that replaces the matched text with a block node.
 *
 * See also {@link defineEnterRule}.
 *
 * @param options
 */
export declare function defineTextBlockEnterRule(options: TextBlockEnterRuleOptions): PlainExtension;
export type { EnterRuleHandler, EnterRuleHandlerOptions };
//# sourceMappingURL=enter-rule.d.ts.map