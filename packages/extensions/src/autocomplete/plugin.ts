import { OBJECT_REPLACEMENT_CHARACTER } from '@prosekit/core'
import { EditorState, Plugin, Transaction } from '@prosekit/pm/state'
import { Decoration, DecorationSet } from '@prosekit/pm/view'

import {
  getPluginState,
  getTrMeta,
  pluginKey,
  setTrMeta,
  type PredictionPluginState,
} from './helpers'
import type { AutocompleteRule } from './rule'

export function createAutocompletePlugin({
  getRules,
}: {
  getRules: () => AutocompleteRule[]
}): Plugin {
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

        const nextValue = calcPluginState(newState, getRules())
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
        const prevValue = getPluginState(prevState)
        const currValue = getPluginState(view.state)

        if (
          prevValue?.active &&
          prevValue.matching &&
          prevValue.matching.rule !== currValue?.matching?.rule
        ) {
          // Deactivate the previous rule
          prevValue.matching.rule.onLeave?.()
        }

        if (
          currValue?.active &&
          currValue.matching &&
          currValue.matching.from !== currValue.ignore
        ) {
          // Activate the current rule

          const { from, to, match, rule } = currValue.matching

          const textContent = view.state.doc.textBetween(
            from,
            to,
            OBJECT_REPLACEMENT_CHARACTER,
          )

          const deleteMatch = () => {
            if (
              view.state.doc.textBetween(
                from,
                to,
                OBJECT_REPLACEMENT_CHARACTER,
              ) === textContent
            ) {
              view.dispatch(view.state.tr.delete(from, to))
            }
          }

          const ignoreMatch = () => {
            view.dispatch(
              setTrMeta(view.state.tr, {
                active: false,
                ignore: from,
                matching: null,
              }),
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

const MAX_MATCH = 200

function calcPluginState(
  state: EditorState,
  rules: AutocompleteRule[],
): PredictionPluginState {
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

    const from = $pos.pos - textBefore.length + match.index

    return {
      active: true,
      ignore: null,
      matching: {
        rule,
        match,
        from,
        to: $pos.pos,
      },
    }
  }

  return { active: false, ignore: null, matching: null }
}
