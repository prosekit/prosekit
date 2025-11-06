import { PlainExtension } from "@prosekit/core";
import { EditorView } from "@prosekit/pm/view";
import { Attrs, MarkType, ProseMirrorNode, Slice } from "@prosekit/pm/model";

//#region src/paste-rule/mark-paste-rule.d.ts

/**
 * The options for {@link defineMarkPasteRule}.
 *
 * @public
 */
interface MarkPasteRuleOptions {
  /**
   * The regular expression to match against. It must have a `g` flag to match
   * all instances of the mark.
   */
  regex: RegExp;
  /**
   * The mark type to apply to the matched text.
   */
  type: string | MarkType;
  /**
   * A function used to compute attributes to set on the mark created by this
   * rule. When it returns `false`, the rule won't match. When it returns `null`
   * or `undefined`, that is interpreted as an empty/default set of attributes.
   * @default null
   */
  getAttrs?: (match: RegExpExecArray) => Attrs | null | undefined | false;
  /**
   * Optional function to determine if a text node should be skipped.
   * Default behavior: skip code nodes and nodes that already have the target mark.
   */
  shouldSkip?: (node: ProseMirrorNode) => boolean;
}
/**
 * Defines a paste rule that applies marks based on regex patterns.
 *
 * @public
 */
declare function defineMarkPasteRule(options: MarkPasteRuleOptions): PlainExtension;
//#endregion
//#region src/paste-rule/paste-rule.d.ts
/**
 * @public
 *
 * Options for {@link PasteRuleHandler}.
 */
interface PasteRuleHandlerOptions {
  /**
   * The slice to be pasted.
   */
  slice: Slice;
  /**
   * The editor view.
   */
  view: EditorView;
  /**
   * Whether the pasted content is treated as plain text. This is true when the
   * `Shift` key is held when pasting.
   */
  plain: boolean;
}
/**
 * @public
 *
 * Can be used to transform pasted or dragged-and-dropped content before it is
 * applied to the document.
 */
type PasteRuleHandler = (options: PasteRuleHandlerOptions) => Slice;
/**
 * Options for {@link definePasteRule}.
 *
 * @public
 */
interface PasteRuleOptions {
  /**
   * A function to be called when a paste rule is triggered.
   */
  handler: PasteRuleHandler;
}
/**
 * Defines a paste rule. This rule allows you to modify pasted or dragged
 * content before it is inserted into the document.
 *
 * @param options
 *
 * @public
 */
declare function definePasteRule({
  handler
}: PasteRuleOptions): PlainExtension;
//#endregion
export { type MarkPasteRuleOptions, type PasteRuleHandler, type PasteRuleHandlerOptions, type PasteRuleOptions, defineMarkPasteRule, definePasteRule };
//# sourceMappingURL=prosekit-extensions-paste-rule.d.ts.map