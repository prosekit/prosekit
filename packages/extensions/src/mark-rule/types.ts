import type {
  Attrs,
  MarkType,
} from '@prosekit/pm/model'

/**
 * The options for {@link defineMarkRule}.
 *
 * @public
 */
export interface MarkRuleOptions {
  /**
   * The regular expression to match against. It must has a `g` flag to match
   * all instances of the mark.
   */
  regex: RegExp

  /**
   * The mark type to apply to the matched text.
   */
  type: string | MarkType

  /**
   * Attributes to set on the mark. If a function is provided, it will be called
   * with the matched result from the regular expression.
   *
   * @default null
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)
}
