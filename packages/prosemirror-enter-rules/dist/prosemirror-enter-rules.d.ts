import { Command, EditorState, Plugin, Transaction } from "prosemirror-state";
import { Attrs, NodeType } from "prosemirror-model";

//#region src/enter-rule.d.ts
/**
 * Options for {@link EnterRuleHandler}.
 *
 * @public
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
type EnterRuleHandler = (options: EnterRuleHandlerOptions) => Transaction | null | undefined;
/**
 * An enter rule that can be passed to {@link createEnterRulePlugin}.
 *
 * @public
 */
interface EnterRule {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp;
  /**
   * A function to be called when an enter rule is triggered.
   */
  handler: EnterRuleHandler;
  /**
   * Whether to stop further handlers from being called if this rule is
   * triggered.
   *
   * @default false
   */
  stop?: boolean;
}
/**
 * Options for {@link createTextBlockEnterRule}.
 *
 * @public
 */
interface TextBlockEnterRuleOptions {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp;
  /**
   * The node type to replace the matched text with. Can be a NodeType instance
   * or a string name that will be resolved from the schema.
   */
  type: string | NodeType;
  /**
   * Attributes to set on the node. If a function is provided, it will be called
   * with the matched result from the regular expression.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null);
  /**
   * Whether to stop further handlers from being called if this rule is
   * triggered.
   *
   * @default true
   */
  stop?: boolean;
}
/**
 * Creates an enter rule that replaces the matched text with a block node.
 *
 * @public
 */
declare function createTextBlockEnterRule({
  regex,
  type,
  attrs,
  stop
}: TextBlockEnterRuleOptions): EnterRule;
/**
 * Creates a ProseMirror command that handles enter rules. This command
 * should be bound to the `Enter` key by a keymap plugin.
 *
 * @public
 */
declare function createEnterRuleCommand({
  rules
}: {
  rules: readonly EnterRule[];
}): Command;
/**
 * Creates a ProseMirror plugin that handles enter rules.
 *
 * @public
 */
declare function createEnterRulePlugin(options: {
  rules: readonly EnterRule[];
}): Plugin;
//#endregion
export { type EnterRule, type EnterRuleHandler, type EnterRuleHandlerOptions, type TextBlockEnterRuleOptions, createEnterRuleCommand, createEnterRulePlugin, createTextBlockEnterRule };