import { ProseKitError } from '@prosekit/core'
import { EditorState, Plugin, PluginKey, Transaction } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

import { defaultIsValid } from './is-valid'

// TODO: make it as a class
export interface PredictionRule {
  match: RegExp
  matchAfter?: RegExp
}

type PredictionPluginState = {
  active: boolean
  ignore?: number | null
  matching?: {
    rule: PredictionRule
    from: number
    to: number
    match: RegExpMatchArray
    matchAfter: RegExpMatchArray | null
  } | null
}

const pluginKey = new PluginKey<PredictionPluginState>('prosemirror-prediction')

function getPluginState(state: EditorState) {
  return pluginKey.getState(state)
}

function getTrMeta(tr: Transaction): PredictionPluginState {
  return tr.getMeta(pluginKey) as PredictionPluginState
}

function setTrMeta(tr: Transaction, meta: PredictionPluginState): Transaction {
  return tr.setMeta(pluginKey, meta)
}

/**
 * @returns Return a Transaction object if you want to append a transaction to current state (using )
 */
type MatchHandler = (options: {
  rule: PredictionRule
  match: RegExpMatchArray
  matchAfter: RegExpMatchArray | null
  state: EditorState

  // Call this function if you want to ignore the current match. This ignoring
  // will be reset if the match is not valid anymore.
  dismiss: VoidFunction

  // Call this function if you want to delete the text in current match. This
  // function will check the text in the match range and only delete the text if
  // it doesn't change.
  deleteMatch: VoidFunction
}) => void

export interface SuggestionOptions {
  rules: PredictionRule[]
  onMatch: MatchHandler
  onDeactivate: VoidFunction
  /**
   * You can pass this function if you want to skip the matching in some cases.
   * By default, the plugin will only run the matching if the current selection
   * is empty, and the selection is not inside a
   * [code](https://prosemirror.net/docs/ref/#model.NodeSpec.code) node nor
   * inside a mark with the name as `code`.
   */
  isValid?: (options: { state: EditorState }) => boolean
}

export function createPredictionPlugin(options: SuggestionOptions): Plugin {
  if (options.rules.length === 0) {
    throw new ProseKitError(
      "You can't create a prediction plugin without rules",
    )
  }

  const { onMatch, onDeactivate, isValid = defaultIsValid } = options

  return new Plugin<PredictionPluginState>({
    key: pluginKey,

    state: {
      init: (): PredictionPluginState => {
        return { active: false, ignore: null, matching: null }
      },
      apply: (
        tr: Transaction,
        prevValue: PredictionPluginState,
        oldState: EditorState,
        newState: EditorState,
      ): PredictionPluginState => {
        const meta = getTrMeta(tr)

        if (
          !tr.docChanged &&
          oldState.selection.eq(newState.selection) &&
          !meta
        ) {
          return prevValue
        }

        if (meta) {
          return meta
        }

        if (!isValid({ state: newState })) {
          return { active: false, ignore: null, matching: null }
        }

        const nextValue = calcPluginState(newState, options.rules)
        if (
          nextValue.active &&
          prevValue.ignore != null &&
          nextValue.matching?.from === prevValue.ignore
        ) {
          return prevValue
        }
        return nextValue
      },
    },

    view: () => ({
      update: (view, prevState) => {
        const prevPluginState = getPluginState(prevState)
        const currPluginState = getPluginState(view.state)

        if (
          currPluginState?.active &&
          currPluginState.matching &&
          currPluginState.matching.from !== currPluginState.ignore
        ) {
          const { from, to } = currPluginState.matching
          const dismiss = () => {
            view.dispatch(
              setTrMeta(view.state.tr, {
                active: false,
                ignore: from,
                matching: null,
              }),
            )
          }
          const textContent = view.state.doc.textBetween(from, to, '\uFFFC')

          const deleteMatch = () => {
            if (
              view.state.doc.textBetween(from, to, '\uFFFC') === textContent
            ) {
              view.dispatch(view.state.tr.delete(from, to))
            }
          }

          onMatch({
            rule: currPluginState.matching.rule,
            match: currPluginState.matching.match,
            matchAfter: currPluginState.matching.matchAfter,
            state: view.state,
            dismiss,
            deleteMatch,
          })
        } else if (prevPluginState?.active) {
          onDeactivate()
        }
      },
    }),

    props: {
      decorations: (state: EditorState) => {
        const pluginState = getPluginState(state)
        if (pluginState?.active && pluginState.matching) {
          const { from, to } = pluginState.matching
          const deco = Decoration.inline(from, to, {
            class: 'prosemirror-prediction-match',
          })
          return DecorationSet.create(state.doc, [deco])
        }
        return null
      },
    },
  })
}

function calcPluginState(
  state: EditorState,
  rules: PredictionRule[],
): PredictionPluginState {
  const { $anchor } = state.selection

  const matchAfter: boolean = rules.some((rule) => rule.matchAfter)

  const parentOffset: number = $anchor.parentOffset

  const textBefore: string = $anchor.parent.textBetween(
    Math.max(0, parentOffset - MAX_MATCH),
    parentOffset,
    null,
    '\uFFFC',
  )
  const textAfter = matchAfter
    ? $anchor.parent.textBetween(
        parentOffset,
        Math.min(parentOffset + MAX_MATCH, $anchor.parent.content.size),
        null,
      )
    : ''

  for (const rule of rules) {
    const match = textBefore.match(rule.match)
    const matchAfter = rule.matchAfter ? textAfter.match(rule.matchAfter) : null

    if (match && match.index != null) {
      const from = $anchor.pos - textBefore.length + match.index
      const to = $anchor.pos + (matchAfter ? matchAfter[0].length : 0)

      return {
        active: true,
        ignore: null,
        matching: {
          rule,
          from,
          to,
          match,
          matchAfter,
        },
      } satisfies PredictionPluginState
    }
  }

  return { active: false }
}

const MAX_MATCH = 200
