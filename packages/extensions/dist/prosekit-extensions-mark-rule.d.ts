import { PlainExtension } from "@prosekit/core";
import { Attrs, MarkType } from "@prosekit/pm/model";

//#region src/mark-rule/types.d.ts

/**
 * The options for {@link defineMarkRule}.
 *
 * @public
 */
interface MarkRuleOptions {
  /**
   * The regular expression to match against. It must has a `g` flag to match
   * all instances of the mark.
   */
  regex: RegExp;
  /**
   * The mark type to apply to the matched text.
   */
  type: string | MarkType;
  /**
   * Attributes to set on the mark. If a function is provided, it will be called
   * with the matched result from the regular expression.
   *
   * @default null
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null);
}
//#endregion
//#region src/mark-rule/mark-rule.d.ts
/**
 * A mark rule is something that can automatically apply marks to text if it
 * matches a certain pattern, and remove them if it doesn't match anymore.
 */
declare function defineMarkRule(options: MarkRuleOptions): PlainExtension;
//#endregion
export { type MarkRuleOptions, defineMarkRule };
//# sourceMappingURL=prosekit-extensions-mark-rule.d.ts.map