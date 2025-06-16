import {
  defineFacet,
  defineFacetPayload,
  getNodeType,
  isTextSelection,
  maybeRun,
  OBJECT_REPLACEMENT_CHARACTER,
  pluginFacet,
  type PlainExtension,
  type PluginPayload,
} from '@prosekit/core'
import { keydownHandler } from '@prosekit/pm/keymap'
import type {
  Attrs,
  NodeType,
} from '@prosekit/pm/model'
import {
  PluginKey,
  ProseMirrorPlugin,
  type Command,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

/**
 * @public
 *
 * Options for {@link EnterRuleHandler}.
 */
export interface EnterRuleHandlerOptions {
  /**
   * The current editor state.
   */
  state: EditorState

  /**
   * The start position of the matched text.
   */
  from: number

  /**
   * The end position of the matched text.
   */
  to: number

  /**
   * The matched result from the regular expression.
   */
  match: RegExpExecArray
}

/**
 * @public
 */
export type EnterRuleHandler = (options: EnterRuleHandlerOptions) => Transaction | null

/**
 * Options for {@link defineEnterRule}.
 *
 * @public
 */
export type EnterRuleOptions = {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp

  /**
   * A function to be called when an enter rule is triggered.
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
 * Options for {@link defineTextBlockEnterRule}.
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
   * Attributes to set on the node. If a function is provided, it will be called
   * with the matched result from the regular expression.
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
 * @param options
 *
 * @public
 */
export function defineEnterRule({
  regex,
  handler,
  stop = false,
}: EnterRuleOptions): PlainExtension {
  const rule: EnterRule = new EnterRule(regex, handler, stop)
  return defineFacetPayload(enterRule, [rule]) as PlainExtension
}

/**
 * Defines an enter rule that replaces the matched text with a block node.
 *
 * See also {@link defineEnterRule}.
 *
 * @param options
 *
 * @public
 */
export function defineTextBlockEnterRule({
  regex,
  type,
  attrs,
  stop = true,
}: TextBlockEnterRuleOptions): PlainExtension {
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

      const nodeAttrs = maybeRun(attrs, match)
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

const enterRule = defineFacet<EnterRule, PluginPayload>({
  reduce: () => {
    let rules: EnterRule[] = []

    const command: Command = (state, dispatch, view) => {
      if (!view) return false
      return execRules(view, rules, dispatch)
    }
    const handler = keydownHandler({ Enter: command })
    const plugin = new ProseMirrorPlugin({
      key: new PluginKey('prosekit-enter-rule'),
      props: { handleKeyDown: handler },
    })

    return function reducer(inputs) {
      rules = inputs
      return plugin
    }
  },

  parent: pluginFacet,
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
    const tr = match
      && rule.handler({
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
