import { type Attrs, type MarkType } from '@prosekit/pm/model'

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

/**
 * @internal
 */
export class MarkRule {
  readonly regex: RegExp
  readonly type: string | MarkType
  readonly getAttrs: (match: RegExpMatchArray) => Attrs | null

  constructor({ regex, type, attrs = null }: MarkRuleOptions) {
    this.regex = regex
    this.type = type
    this.getAttrs =
      typeof attrs === 'function'
        ? (attrs as (match: RegExpMatchArray) => Attrs | null)
        : () => attrs
  }
}
