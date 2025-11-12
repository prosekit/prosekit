import { OBJECT_REPLACEMENT_CHARACTER } from '@prosekit/core'
import {
  Plugin,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'
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

        // No changes
        if (
          !tr.docChanged
          && oldState.selection.eq(newState.selection)
          && !meta
        ) {
          return prevValue
        }

        // Receiving a meta means that we are ignoring a match
        if (meta) {
          let ignores = prevValue.ignores
          if (!ignores.includes(meta.ignore)) {
            ignores = [...ignores, meta.ignore]
          }
          return { matching: null, ignores }
        }

        // Calculate the new ignores
        const ignores = new Set(prevValue.ignores.map(pos => tr.mapping.map(pos)))

        // If there was a matching before, but the text cursor moves outside of
        // it now, we ignore that match.
        if (prevValue.matching) {
          let { from: prevMatchingFrom, to: prevMatchingTo } = prevValue.matching

          prevMatchingFrom = tr.mapping.map(prevMatchingFrom)
          prevMatchingTo = tr.mapping.map(prevMatchingTo)

          // If the previous matching is not empty
          if (prevMatchingFrom < prevMatchingTo) {
            let { from: selectionFrom, to: selectionTo } = newState.selection

            // If the text selection is before the matching or after the matching
            if (selectionTo <= prevMatchingFrom || selectionFrom >= prevMatchingTo + 1) {
              ignores.add(prevMatchingFrom)
            }
          }
        }

        // Calculate the new matching
        let matching = calcPluginStateMatching(newState, getRules(), ignores)

        // Return the new matching and ignores
        return { matching, ignores: Array.from(ignores) }
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
              setTrMeta(view.state.tr, { ignore: from }),
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

const MAX_MATCH = 200

function calcPluginStateMatching(
  state: EditorState,
  rules: AutocompleteRule[],
  ignores: Set<number>,
): PredictionPluginMatching | null {
  const $pos = state.selection.$from

  const parentOffset: number = $pos.parentOffset

  const textBefore: string = $pos.parent.textBetween(
    Math.max(0, parentOffset - MAX_MATCH),
    parentOffset,
    null,
    OBJECT_REPLACEMENT_CHARACTER,
  )

  for (const rule of rules) {
    if (!rule.canMatch({ state })) {
      continue
    }

    rule.regex.lastIndex = 0
    const match = rule.regex.exec(textBefore)
    if (!match) {
      continue
    }

    const to = $pos.pos
    const from = to - textBefore.length + match.index

    // Check if the matching should be ignored
    if (ignores.has(from)) {
      continue
    }

    return { rule, match, from, to }
  }

  return null
}
