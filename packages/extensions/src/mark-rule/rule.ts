import { Mark, type Attrs, type MarkType } from '@prosekit/pm/model'

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

  /**
   * Whether to remove other marks of the same type when they don't match the
   * regular expression. It can be a boolean value or a function that takes the
   * mark and returns a boolean.
   *
   * @default true
   */
  remove?: boolean | ((mark: Mark) => boolean)
}

/**
 * @internal
 */
export class MarkRule {
  readonly regex: RegExp
  readonly type: string | MarkType
  readonly getAttrs: (match: RegExpMatchArray) => Attrs | null
  readonly remove: (mark: Mark) => boolean

  constructor({ regex, type, attrs = null, remove = true }: MarkRuleOptions) {
    this.regex = regex
    this.type = type
    this.getAttrs =
      typeof attrs === 'function'
        ? (attrs as (match: RegExpMatchArray) => Attrs | null)
        : () => attrs
    this.remove = typeof remove === 'function' ? remove : () => remove
  }
}
