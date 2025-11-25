import { OBJECT_REPLACEMENT_CHARACTER } from '@prosekit/core'
import type { ResolvedPos } from '@prosekit/pm/model'
import {
  Plugin,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'
import type { Mapping } from '@prosekit/pm/transform'
import type { EditorView } from '@prosekit/pm/view'
import {
  Decoration,
  DecorationSet,
} from '@prosekit/pm/view'

import {
  getPluginState,
  getTrMeta,
  pluginKey,
  setTrMeta,
  type PredictionPluginMatching,
  type PredictionPluginState,
} from './autocomplete-helpers'
import type { AutocompleteRule } from './autocomplete-rule'

export function createAutocompletePlugin({
  getRules,
}: {
  getRules: () => AutocompleteRule[]
}): Plugin {
  return new Plugin<PredictionPluginState>({
    key: pluginKey,

    state: {
      init: (): PredictionPluginState => {
        return { ignores: [], matching: null }
      },
      apply: (
        tr: Transaction,
        prevValue: PredictionPluginState,
        oldState: EditorState,
        newState: EditorState,
      ): PredictionPluginState => {
        const meta = getTrMeta(tr)

        if (
          !meta
          && !tr.docChanged
          && oldState.selection.eq(newState.selection)
        ) {
          // No changes
          return prevValue
        }

        // Handle position mapping changes
        const ignores = Array.from(new Set(prevValue.ignores.map(pos => tr.mapping.map(pos))))
        const prevMatching = prevValue.matching && mapMatching(prevValue.matching, tr.mapping)

        if (!meta) {
          if (prevMatching) {
            const { selection } = newState
            // If the text selection is before the matching or after the matching
            if (selection.to <= prevMatching.from || selection.from >= prevMatching.to + 1) {
              ignores.push(prevMatching.from)
              return { matching: null, ignores }
            }
          }
          return { matching: prevMatching, ignores }
        }

        // A new matching is being entered
        if (meta.type === 'enter') {
          // Ignore the previous matching if it is not the same as the new matching
          if (prevMatching && prevMatching.rule !== meta.matching.rule) {
            ignores.push(prevMatching.from)
          }

          // Return the new matching
          return { matching: meta.matching, ignores }
        }

        // Exiting a matching
        if (meta.type === 'leave') {
          if (prevMatching) {
            ignores.push(prevMatching.from)
          }
          return { matching: null, ignores }
        }

        throw new Error(`Invalid transaction meta: ${meta satisfies never}`)
      },
    },

    view: () => ({
      update: (view, prevState) => {
        const prevValue = getPluginState(prevState)
        const currValue = getPluginState(view.state)

        if (
          prevValue?.matching
          && prevValue.matching.rule !== currValue?.matching?.rule
        ) {
          // Deactivate the previous rule
          prevValue.matching.rule.onLeave?.()
        }

        if (
          currValue?.matching
          && !currValue.ignores.includes(currValue.matching.from)
        ) {
          // Activate the current rule

          const { from, to, match, rule } = currValue.matching

          const textContent = view.state.doc.textBetween(
            from,
            to,
            null,
            OBJECT_REPLACEMENT_CHARACTER,
          )

          const deleteMatch = () => {
            if (
              view.state.doc.textBetween(
                from,
                to,
                null,
                OBJECT_REPLACEMENT_CHARACTER,
              ) === textContent
            ) {
              view.dispatch(view.state.tr.delete(from, to))
            }
          }

          const ignoreMatch = () => {
            view.dispatch(
              setTrMeta(view.state.tr, { type: 'leave' }),
            )
          }

          rule.onMatch({
            state: view.state,
            match,
            from,
            to,
            deleteMatch,
            ignoreMatch,
          })
        }
      },
    }),

    props: {
      handleTextInput: (view, from, to, textAdded, getTr) => {
        const tr = handleTextInput(view, from, to, textAdded, getTr, getRules)
        if (tr) {
          view.dispatch(tr)
          return true
        }
        return false
      },
      decorations: (state: EditorState) => {
        const pluginState = getPluginState(state)
        if (pluginState?.matching) {
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

function handleTextInput(
  view: EditorView,
  from: number,
  to: number,
  textAdded: string,
  getTr: () => Transaction,
  getRules: () => AutocompleteRule[],
): Transaction | undefined {
  // Only handle insertions
  if (from !== to) {
    return
  }

  const textBackward = getTextBackward(view.state.doc.resolve(from))
  const textFull = textBackward + textAdded

  const pluginState = getPluginState(view.state)
  const ignores = pluginState?.ignores ?? []
  const prevMatching = pluginState?.matching

  const currMatching = matchRule(
    view.state,
    getRules(),
    textFull,
    to + textAdded.length,
    ignores,
  )

  if (currMatching) {
    return setTrMeta(getTr(), { type: 'enter', matching: currMatching })
  } else if (prevMatching) {
    return setTrMeta(getTr(), { type: 'leave' })
  }
}

const MAX_MATCH = 200

/** Get the text before the given position at the current block. */
function getTextBackward($pos: ResolvedPos): string {
  const parentOffset: number = $pos.parentOffset
  return $pos.parent.textBetween(
    Math.max(0, parentOffset - MAX_MATCH),
    parentOffset,
    null,
    OBJECT_REPLACEMENT_CHARACTER,
  )
}

function matchRule(
  state: EditorState,
  rules: AutocompleteRule[],
  text: string,
  to: number,
  ignores: Array<number>,
): PredictionPluginMatching | undefined {
  for (const rule of rules) {
    if (!rule.canMatch({ state })) {
      continue
    }

    rule.regex.lastIndex = 0
    const match = rule.regex.exec(text)
    if (!match) {
      continue
    }

    const from = to - text.length + match.index

    // Check if the matching should be ignored
    if (ignores.includes(from)) {
      continue
    }

    const $from = state.selection.$from
    const parentStart = $from.start($from.depth)

    return { rule, match, from, to, parentStart }
  }
}

function mapMatching(matching: PredictionPluginMatching, mapping: Mapping): PredictionPluginMatching {
  return {
    rule: matching.rule,
    match: matching.match,
    from: mapping.map(matching.from),
    to: mapping.map(matching.to),
    parentStart: mapping.map(matching.parentStart),
  }
}
