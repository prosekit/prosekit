import {
  defineFacet,
  defineFacetPayload,
  getMarkType,
  getNodeType,
  isMarkAbsent,
  maybeRun,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'
import { InputRule, inputRules, textblockTypeInputRule, wrappingInputRule } from '@prosekit/pm/inputrules'
import type { Attrs, MarkType, NodeType, ProseMirrorNode, Schema } from '@prosekit/pm/model'
import type { EditorState, Plugin, Transaction } from '@prosekit/pm/state'

/**
 * Defines an input rule extension.
 *
 * @param rule - The ProseMirror input rule to add.
 */
export function defineInputRule(rule: InputRule): PlainExtension {
  return defineInputRuleFactory(() => rule)
}

/**
 * A function that creates an input rule once the editor schema is known.
 *
 * @internal
 */
export type InputRuleFactory = (context: { schema: Schema }) => InputRule

/**
 * Defines an input rule extension from a factory. Use this when the rule needs
 * the editor schema, for example to resolve a node type by name.
 *
 * @internal
 */
export function defineInputRuleFactory(factory: InputRuleFactory): PlainExtension {
  return defineFacetPayload(inputRuleFacet, [factory]) as PlainExtension
}

type InputRuleHandler = (
  state: EditorState,
  match: RegExpMatchArray,
  start: number,
  end: number,
) => Transaction | null

// The fields `InputRule` stores at runtime. `match` and `handler` are not in
// the public type.
interface InputRuleFields {
  match: RegExp
  handler: InputRuleHandler
  undoable: boolean
  inCode: boolean | 'only'
  inCodeMark: boolean | 'only'
}

/**
 * Returns a copy of `rule` that only fires when `enabled` returns `true` for
 * the current editor state.
 *
 * @internal
 */
export function gateInputRule(
  rule: InputRule,
  enabled: (state: EditorState) => boolean,
): InputRule {
  const { match, handler, undoable, inCode, inCodeMark } = rule as unknown as InputRuleFields
  const gated = new InputRule(
    match,
    (state, matched, start, end) => (enabled(state) ? handler(state, matched, start, end) : null),
    { undoable, inCode },
  )
  // The constructor option only accepts a boolean; the field also holds `'only'`.
  gated.inCodeMark = inCodeMark
  return gated
}

/**
 * Options for {@link defineMarkInputRule}.
 */
export interface MarkInputRuleOptions {
  /**
   * The regular expression to match against, which should end with `$` and has
   * exactly one capture group. All other matched text outside the capture group
   * will be deleted.
   */
  regex: RegExp

  /**
   * The type of mark to set.
   */
  type: string | MarkType

  /**
   * Attributes to set on the mark.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)

  /**
   * Whether this rule should fire inside marks marked as [code](https://prosemirror.net/docs/ref/#model.MarkSpec.code).
   *
   * @default `false`
   */
  inCodeMark?: boolean
}

/**
 * @internal
 */
export function createMarkInputRule({
  regex,
  type,
  attrs = null,
  inCodeMark = false,
}: MarkInputRuleOptions): InputRule {
  const rule = new InputRule(regex, (state, match, start, end) => {
    const { tr, schema } = state
    const [fullText, markText] = match

    if (!markText) {
      return null
    }

    const markStart = start + fullText.indexOf(markText)
    const markEnd = markStart + markText.length

    if (!(start <= markStart && markStart < markEnd && markEnd <= end)) {
      // Incorrect regex.
      return null
    }

    const markType = getMarkType(schema, type)
    const mark = markType.create(maybeRun(attrs, match))

    if (!isMarkAbsent(tr.doc, markStart, markEnd, markType, attrs)) {
      // The mark is already active.
      return null
    }

    const initialStoredMarks = tr.storedMarks ?? []

    tr.addMark(markStart, markEnd, mark)

    if (markEnd < end) {
      tr.delete(markEnd, end)
    }
    if (start < markStart) {
      tr.delete(start, markStart)
    }

    // Make sure not to reactivate any marks which had previously been
    // deactivated. By keeping track of the initial stored marks we are able to
    // discard any unintended consequences of deleting text and adding it again.
    tr.setStoredMarks(initialStoredMarks)

    return tr
  }, { inCodeMark })

  return rule
}

/**
 * Defines an input rule for automatically adding inline marks when a given
 * pattern is typed.
 */
export function defineMarkInputRule(
  options: MarkInputRuleOptions,
): PlainExtension {
  return defineInputRule(createMarkInputRule(options))
}

/**
 * Options for {@link defineTextBlockInputRule}.
 */
export interface TextBlockInputRuleOptions {
  /**
   * The regular expression to match against, which should end with `$`. It
   * usually also starts with `^` to that it is only matched at the start of a
   * textblock.
   */
  regex: RegExp

  /**
   * The node type to replace the matched text with.
   */
  type: string | NodeType

  /**
   * Attributes to set on the node.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)
}

/**
 * Defines an input rule that changes the type of a textblock when the matched
 * text is typed into it.
 *
 * See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)
 *
 * @param options
 */
export function defineTextBlockInputRule({
  regex,
  type,
  attrs,
}: TextBlockInputRuleOptions): PlainExtension {
  return defineInputRuleFactory(({ schema }): InputRule => {
    const nodeType = getNodeType(schema, type)
    return textblockTypeInputRule(regex, nodeType, attrs)
  })
}

/**
 * Options for {@link defineWrappingInputRule}.
 */
export interface WrappingInputRuleOptions {
  /**
   * The regular expression to match against, which should end with `$`. It
   * usually also starts with `^` to that it is only matched at the start of a
   * textblock.
   */
  regex: RegExp

  /**
   * The type of node to wrap in.
   */
  type: string | NodeType

  /**
   * Attributes to set on the node.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)

  /**
   * By default, if there's a node with the same type above the newly wrapped
   * node, the rule will try to
   * [join](https://prosemirror.net/docs/ref/#transform.Transform.join) those
   * two nodes. You can pass a join predicate, which takes a regular expression
   * match and the node before the wrapped node, and can return a boolean to
   * indicate whether a join should happen.
   */
  join?: (match: RegExpMatchArray, node: ProseMirrorNode) => boolean
}

/**
 * Defines an input rule for automatically wrapping a textblock when a given
 * string is typed.
 *
 * See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)
 *
 * @param options
 */
export function defineWrappingInputRule({
  regex,
  type,
  attrs,
  join,
}: WrappingInputRuleOptions): PlainExtension {
  return defineInputRuleFactory(({ schema }): InputRule => {
    const nodeType = getNodeType(schema, type)
    return wrappingInputRule(regex, nodeType, attrs, join)
  })
}

const inputRuleFacet = defineFacet<InputRuleFactory, PluginPayload>({
  reducer: (inputs: InputRuleFactory[]): PluginPayload => {
    return (context): Plugin[] => {
      const rules: InputRule[] = inputs.flatMap((callback) => callback(context))
      return [inputRules({ rules })]
    }
  },
  parent: pluginFacet,
})
