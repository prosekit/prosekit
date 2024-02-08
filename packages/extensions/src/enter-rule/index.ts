import {
  Facet,
  OBJECT_REPLACEMENT_CHARACTER,
  getNodeType,
  isTextSelection,
  pluginFacet,
  type Extension,
  type PluginPayload,
} from '@prosekit/core'
import { keydownHandler } from '@prosekit/pm/keymap'
import type { Attrs, NodeType } from '@prosekit/pm/model'
import {
  ProseMirrorPlugin,
  type Command,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

// TODO: Export `prosekit/extension/enter-rule`, when we are happy with the API.

/**
 * @public
 */
export type EnterRuleHandler = (options: {
  state: EditorState
  from: number
  to: number
  match: RegExpExecArray
}) => Transaction | null

/**
 * Options for {@link createEnterRule}.
 *
 * @public
 */
export type EnterRuleOptions = {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp

  /**
   * A handler function to be called when an enter rule is triggered.
   */
  handler: EnterRuleHandler

  /**
   * Whether to stop further handlers from being called if this rule is triggered.
   *
   * @default false
   */
  stop?: boolean
}

/**
 * Options for {@link createTextBlockEnterRule}.
 *
 * @public
 */
export type TextBlockEnterRuleOptions = {
  /**
   * The regular expression to match against. It should end with `$`.
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

  /**
   * Whether to stop further handlers from being called if this rule is triggered.
   *
   * @default true
   */
  stop?: boolean
}

/**
 * Defines an enter rule. An enter rule applies when the text directly in front of
 * the cursor matches `regex` and user presses Enter. The `regex` should end
 * with `$`.
 *
 * @public
 */
export function defineEnterRule({
  regex,
  handler,
  stop = false,
}: EnterRuleOptions): Extension {
  const rule: EnterRule = new EnterRule(regex, handler, stop)
  return enterRule.extension([rule])
}

/**
 * Defines an enter rule that replaces the matched text with a block node.
 *
 * See also {@link defineEnterRule}.
 *
 * @public
 */
export function defineTextBlockEnterRule({
  regex,
  type,
  attrs,
  stop = true,
}: TextBlockEnterRuleOptions): Extension {
  return defineEnterRule({
    regex,
    handler: ({ state, from, to, match }) => {
      const nodeType = getNodeType(state.schema, type)
      const $start = state.doc.resolve(from)

      if (
        !$start
          .node(-1)
          .canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)
      ) {
        return null
      }

      const nodeAttrs: Attrs | null | undefined =
        attrs && typeof attrs === 'function'
          ? (attrs(match) as Attrs | null)
          : attrs
      return state.tr
        .delete(from, to)
        .setBlockType(from, from, nodeType, nodeAttrs)
    },
    stop,
  })
}

/**
 * @internal
 */
class EnterRule {
  constructor(
    readonly regex: RegExp,
    readonly handler: EnterRuleHandler,
    readonly stop: boolean,
  ) {}
}

const enterRule = Facet.define<EnterRule, PluginPayload>({
  converter: () => {
    let rules: EnterRule[] = []

    const command: Command = (state, dispatch, view) => {
      if (!view) return false
      return execRules(view, rules, dispatch)
    }
    const handler = keydownHandler({ Enter: command })
    const plugin = new ProseMirrorPlugin({ props: { handleKeyDown: handler } })
    const pluginFunc = () => [plugin]

    return {
      create: (inputs: EnterRule[]) => {
        rules = inputs
        return pluginFunc
      },
      update: (inputs: EnterRule[]) => {
        rules = inputs
        return null
      },
    }
  },

  next: pluginFacet,
})

function execRules(
  view: EditorView,
  rules: readonly EnterRule[],
  dispatch?: (tr: Transaction) => void,
): boolean {
  if (view.composing) return false
  const state = view.state
  const selection = state.selection
  if (!isTextSelection(selection)) return false
  const $cursor = selection.$cursor
  if (!$cursor || $cursor.parent.type.spec.code) return false

  const textBefore = $cursor.parent.textBetween(
    Math.max(0, $cursor.parentOffset - MAX_MATCH),
    $cursor.parentOffset,
    null,
    OBJECT_REPLACEMENT_CHARACTER,
  )

  for (const rule of rules) {
    rule.regex.lastIndex = 0
    const match = rule.regex.exec(textBefore)
    const tr =
      match &&
      rule.handler({
        state,
        from: $cursor.pos - match[0].length,
        to: $cursor.pos,
        match,
      })
    if (!tr) continue
    dispatch?.(tr)

    if (rule.stop) {
      return true
    }
  }
  return false
}

const MAX_MATCH = 200
