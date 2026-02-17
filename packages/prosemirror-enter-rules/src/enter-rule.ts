import { keydownHandler } from 'prosemirror-keymap'
import type { Attrs, NodeType, Schema } from 'prosemirror-model'
import { Plugin, PluginKey, TextSelection, type Command, type EditorState, type Transaction } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'

/**
 * Options for {@link EnterRuleHandler}.
 *
 * @public
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
export type EnterRuleHandler = (
  options: EnterRuleHandlerOptions,
) => Transaction | null | undefined

/**
 * An enter rule that can be passed to {@link createEnterRulePlugin}.
 *
 * @public
 */
export interface EnterRule {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp

  /**
   * A function to be called when an enter rule is triggered.
   */
  handler: EnterRuleHandler

  /**
   * Whether to stop further handlers from being called if this rule is
   * triggered.
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
export interface TextBlockEnterRuleOptions {
  /**
   * The regular expression to match against. It should end with `$`.
   */
  regex: RegExp

  /**
   * The node type to replace the matched text with. Can be a NodeType instance
   * or a string name that will be resolved from the schema.
   */
  type: string | NodeType

  /**
   * Attributes to set on the node. If a function is provided, it will be called
   * with the matched result from the regular expression.
   */
  attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)

  /**
   * Whether to stop further handlers from being called if this rule is
   * triggered.
   *
   * @default true
   */
  stop?: boolean
}

/**
 * Creates an enter rule that replaces the matched text with a block node.
 *
 * @public
 */
export function createTextBlockEnterRule({
  regex,
  type,
  attrs,
  stop = true,
}: TextBlockEnterRuleOptions): EnterRule {
  const handler: EnterRuleHandler = ({ state, from, to, match }) => {
    const nodeType = resolveNodeType(state.schema, type)
    const $start = state.doc.resolve(from)

    if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) {
      return null
    }

    let nodeAttrs: Attrs | null = null
    if (attrs) {
      if (typeof attrs === 'object') {
        nodeAttrs = attrs
      } else if (typeof attrs === 'function') {
        nodeAttrs = attrs(match)
      }
    }

    return state.tr.delete(from, to).setBlockType(from, from, nodeType, nodeAttrs)
  }

  return { regex, handler, stop }
}

function resolveNodeType(schema: Schema, type: string | NodeType): NodeType {
  if (typeof type === 'string') {
    const nodeType = schema.nodes[type]
    if (!nodeType) {
      throw new Error(`Unknown node type "${type}"`)
    }
    return nodeType
  }
  return type
}

const key = new PluginKey('prosemirror-enter-rules')

/**
 * Creates a ProseMirror plugin that handles enter rules.
 *
 * @public
 */
export function createEnterRulePlugin({
  rules,
}: {
  rules: EnterRule[]
}): Plugin {
  const command: Command = (state, dispatch, view) => {
    if (!view) return false
    return execEnterRules(view, rules, dispatch)
  }
  const handler = keydownHandler({ Enter: command })
  return new Plugin({
    key,
    props: { handleKeyDown: handler },
  })
}

const OBJECT_REPLACEMENT_CHARACTER = '\uFFFC'
const MAX_MATCH = 200

/**
 * Executes enter rules against the current editor state. Returns true if any
 * rule matched and was applied.
 */
function execEnterRules(
  view: EditorView,
  rules: readonly EnterRule[],
  dispatch?: (tr: Transaction) => void,
): boolean {
  if (view.composing) return false
  const selection = view.state.selection
  if (!(selection instanceof TextSelection)) return false
  const { $cursor } = selection
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
        state: view.state,
        from: $cursor.pos - match[0].length,
        to: $cursor.pos,
        match,
      })
    if (!tr) {
      continue
    }

    dispatch?.(tr)

    if (rule.stop) {
      return true
    }
  }
  return false
}
