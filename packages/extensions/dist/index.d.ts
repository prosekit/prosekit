import { EditorState, Transaction } from "@prosekit/pm/state";
import { PlainExtension } from "@prosekit/core";
import { InputRule } from "@prosekit/pm/inputrules";
import { Attrs, MarkType, NodeType, ProseMirrorNode } from "@prosekit/pm/model";
/**
 * Defines an input rule extension.
 *
 * @param rule - The ProseMirror input rule to add.
 */
declare function defineInputRule(rule: InputRule): PlainExtension;
/**
 * The function an input rule runs when its pattern matches.
 *
 * @internal
 */
type InputRuleHandler = (state: EditorState, match: RegExpMatchArray, start: number, end: number) => Transaction | null;
/**
 * Options for {@link defineMarkInputRule}.
 */
interface MarkInputRuleOptions {
  /**
   * The regular expression to match against, which should end with `$` and has
   * exactly one capture group. All other matched text outside the capture group
   * will be deleted.
   */
  regex: RegExp;
  /**
   * The type of mark to set.
   */
  type: string | MarkType;
  /**
   * Attributes to set on the mark.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null);
  /**
   * Whether this rule should fire inside marks marked as [code](https://prosemirror.net/docs/ref/#model.MarkSpec.code).
   *
   * @default `false`
   */
  inCodeMark?: boolean;
}
/**
 * @internal
 */
declare function createMarkInputRule({ regex, type, attrs, inCodeMark }: MarkInputRuleOptions): InputRule;
/**
 * Defines an input rule for automatically adding inline marks when a given
 * pattern is typed.
 */
declare function defineMarkInputRule(options: MarkInputRuleOptions): PlainExtension;
/**
 * Options for {@link defineTextBlockInputRule}.
 */
interface TextBlockInputRuleOptions {
  /**
   * The regular expression to match against, which should end with `$`. It
   * usually also starts with `^` to that it is only matched at the start of a
   * textblock.
   */
  regex: RegExp;
  /**
   * The node type to replace the matched text with.
   */
  type: string | NodeType;
  /**
   * Attributes to set on the node.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null);
}
/**
 * Defines an input rule that changes the type of a textblock when the matched
 * text is typed into it.
 *
 * See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)
 *
 * @param options
 */
declare function defineTextBlockInputRule(options: TextBlockInputRuleOptions): PlainExtension;
/**
 * The handler behind {@link defineTextBlockInputRule}: it replaces the matched
 * text and changes the textblock to `type`. The node type is resolved from the
 * state's schema when the rule fires.
 *
 * @internal
 */
declare function createTextBlockInputRuleHandler({ type, attrs }: TextBlockInputRuleOptions): InputRuleHandler;
/**
 * Options for {@link defineWrappingInputRule}.
 */
interface WrappingInputRuleOptions {
  /**
   * The regular expression to match against, which should end with `$`. It
   * usually also starts with `^` to that it is only matched at the start of a
   * textblock.
   */
  regex: RegExp;
  /**
   * The type of node to wrap in.
   */
  type: string | NodeType;
  /**
   * Attributes to set on the node.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null);
  /**
   * By default, if there's a node with the same type above the newly wrapped
   * node, the rule will try to
   * [join](https://prosemirror.net/docs/ref/#transform.Transform.join) those
   * two nodes. You can pass a join predicate, which takes a regular expression
   * match and the node before the wrapped node, and can return a boolean to
   * indicate whether a join should happen.
   */
  join?: (match: RegExpMatchArray, node: ProseMirrorNode) => boolean;
}
/**
 * Defines an input rule for automatically wrapping a textblock when a given
 * string is typed.
 *
 * See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)
 *
 * @param options
 */
declare function defineWrappingInputRule(options: WrappingInputRuleOptions): PlainExtension;
/**
 * The handler behind {@link defineWrappingInputRule}: it deletes the matched
 * text and wraps the textblock in `type`, joining it with a preceding node of
 * the same type. The node type is resolved from the state's schema when the
 * rule fires.
 *
 * @internal
 */
declare function createWrappingInputRuleHandler({ type, attrs, join }: WrappingInputRuleOptions): InputRuleHandler;
export { createMarkInputRule as a, defineInputRule as c, defineWrappingInputRule as d, WrappingInputRuleOptions as i, defineMarkInputRule as l, MarkInputRuleOptions as n, createTextBlockInputRuleHandler as o, TextBlockInputRuleOptions as r, createWrappingInputRuleHandler as s, InputRuleHandler as t, defineTextBlockInputRule as u };
//# sourceMappingURL=index.d.ts.map