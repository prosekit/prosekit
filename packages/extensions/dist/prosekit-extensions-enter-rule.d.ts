import { PlainExtension } from "@prosekit/core";
import { EditorState, Transaction } from "@prosekit/pm/state";
import { Attrs, NodeType } from "@prosekit/pm/model";

//#region src/enter-rule/index.d.ts
/**
 * @public
 *
 * Options for {@link EnterRuleHandler}.
 */
interface EnterRuleHandlerOptions {
  /**
   * The current editor state.
   */
  state: EditorState;
  /**
   * The start position of the matched text.
   */
  from: number;
  /**
   * The end position of the matched text.
   */
  to: number;
  /**
   * The matched result from the regular expression.
   */
  match: RegExpExecArray;
}
/**
 * @public
 */
type EnterRuleHandler = (options: EnterRuleHandlerOptions) => Transaction | null;
/**
 * Options for {@link defineEnterRule}.
 *
 * @public
 */
type EnterRuleOptions = {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp;
  /**
   * A function to be called when an enter rule is triggered.
   */
  handler: EnterRuleHandler;
  /**
   * Whether to stop further handlers from being called if this rule is triggered.
   *
   * @default false
   */
  stop?: boolean;
};
/**
 * Options for {@link defineTextBlockEnterRule}.
 *
 * @public
 */
interface TextBlockEnterRuleOptions {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp;
  /**
   * The node type to replace the matched text with.
   */
  type: string | NodeType;
  /**
   * Attributes to set on the node. If a function is provided, it will be called
   * with the matched result from the regular expression.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null);
  /**
   * Whether to stop further handlers from being called if this rule is triggered.
   *
   * @default true
   */
  stop?: boolean;
}
/**
 * Defines an enter rule. An enter rule applies when the text directly in front of
 * the cursor matches `regex` and user presses Enter. The `regex` should end
 * with `$`.
 *
 * @param options
 *
 * @public
 */
declare function defineEnterRule({
  regex,
  handler,
  stop
}: EnterRuleOptions): PlainExtension;
/**
 * Defines an enter rule that replaces the matched text with a block node.
 *
 * See also {@link defineEnterRule}.
 *
 * @param options
 *
 * @public
 */
declare function defineTextBlockEnterRule({
  regex,
  type,
  attrs,
  stop
}: TextBlockEnterRuleOptions): PlainExtension;
//#endregion
export { EnterRuleHandler, EnterRuleHandlerOptions, EnterRuleOptions, TextBlockEnterRuleOptions, defineEnterRule, defineTextBlockEnterRule };
//# sourceMappingURL=prosekit-extensions-enter-rule.d.ts.map