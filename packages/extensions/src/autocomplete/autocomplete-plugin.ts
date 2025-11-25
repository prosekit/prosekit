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
  type PredictionTransactionMeta,
} from './autocomplete-helpers'
import type { AutocompleteRule } from './autocomplete-rule'

/**
 * Creates a plugin that handles autocomplete functionality.
 *
 * Workflow:
 *
 * 1. {@link handleTextInput}: called when text is going to be input, but the
 *    transaction is not yet created. Injects a new matching as a transaction
 *    meta if applicable. This is the only place to create a new matching if
 *    there is no existing matching.
 * 2. {@link handleTransaction}: called when a transaction is going to be
 *    applied. Updates the plugin state based on the transaction. This step
 *    determines if a matching should be created, updated or removed.
 * 3. {@link handleUpdate}: called when the editor state is updated. This is the
 *    place to call `onMatch` and register `deleteMatch` and `ignoreMatch`
 *    callbacks.
 * 4. {@link getDecorations}: creates the decorations for the current matching.
 */
export function createAutocompletePlugin({
  getRules,
}: {
  getRules: () => AutocompleteRule[]
}): Plugin {
  return new Plugin<PredictionPluginState>({
    key: pluginKey,

    state: {
      init: (): PredictionPluginState => {
        return { ignores: new Set(), matching: null }
      },
      apply: (tr, prevValue, oldState, newState): PredictionPluginState => {
        return handleTransaction(tr, prevValue, oldState, newState, getRules)
      },
    },

    view: () => ({
      update: handleUpdate,
    }),

    props: {
      handleTextInput: (view, from, to, textAdded, getTr) => {
        const meta = handleTextInput(view, from, to, textAdded, getRules)
        if (meta) {
          const tr = getTr()
          setTrMeta(tr, meta)
          view.dispatch(tr)
          return true
        }
        return false
      },
      decorations: getDecorations,
    },
  })
}

function handleTextInput(
  view: EditorView,
  from: number,
  to: number,
  textAdded: string,
  getRules: () => AutocompleteRule[],
): PredictionTransactionMeta | undefined {
  // Only handle insertions
  if (from !== to) {
    return
  }

  const textBackward = getTextBackward(view.state.doc.resolve(from))
  const textFull = textBackward + textAdded

  const pluginState = getPluginState(view.state)
  const ignores = pluginState?.ignores ?? new Set<number>()

  const currMatching = matchRule(
    view.state,
    getRules(),
    textFull,
    to + textAdded.length,
    ignores,
  )

  if (currMatching) {
    return { type: 'enter', matching: currMatching }
  }
}

function handleTransaction(
  tr: Transaction,
  prevValue: PredictionPluginState,
  oldState: EditorState,
  newState: EditorState,
  getRules: () => AutocompleteRule[],
): PredictionPluginState {
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
  const ignores = new Set<number>()
  for (const ignore of prevValue.ignores) {
    const result = tr.mapping.mapResult(ignore)
    if (!result.deletedBefore && !result.deletedAfter) {
      ignores.add(result.pos)
    }
  }

  const prevMatching = prevValue.matching && mapMatching(prevValue.matching, tr.mapping)

  // If there is no new matching from `handleTextInput`
  if (!meta) {
    if (!prevMatching) {
      return { matching: null, ignores }
    }

    const { selection } = newState
    // If the text selection is before the matching or after the matching,
    // we leave the matching
    if (selection.to < prevMatching.from || selection.from > prevMatching.to) {
      ignores.add(prevMatching.from)
      return { matching: null, ignores }
    }

    // Get the text between the existing matching
    const text = newState.doc.textBetween(
      prevMatching.from,
      prevMatching.to,
      null,
      OBJECT_REPLACEMENT_CHARACTER,
    )
    // Check the text again to see if it still matches the rule
    const currMatching = matchRule(
      newState,
      getRules(),
      text,
      prevMatching.to,
      ignores,
    )
    return { matching: currMatching ?? null, ignores }
  }

  // If a new matching is being entered from `handleTextInput`
  if (meta.type === 'enter') {
    // Ignore the previous matching if it is not the same as the new matching
    if (prevMatching && prevMatching.from !== meta.matching.from) {
      ignores.add(prevMatching.from)
    }

    // Return the new matching
    return { matching: meta.matching, ignores }
  }

  // If a matching is being exited
  if (meta.type === 'leave') {
    if (prevMatching) {
      ignores.add(prevMatching.from)
    }
    return { matching: null, ignores }
  }

  throw new Error(`Invalid transaction meta: ${meta satisfies never}`)
}

function handleUpdate(view: EditorView, prevState: EditorState): void {
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
    && !currValue.ignores.has(currValue.matching.from)
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
}

function getDecorations(state: EditorState): DecorationSet | null {
  const pluginState = getPluginState(state)
  if (pluginState?.matching) {
    const { from, to } = pluginState.matching
    const deco = Decoration.inline(from, to, {
      class: 'prosemirror-prediction-match',
    })
    return DecorationSet.create(state.doc, [deco])
  }
  return null
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
  ignores: Set<number>,
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
    if (ignores.has(from)) {
      continue
    }

    return { rule, match, from, to }
  }
}

function mapMatching(matching: PredictionPluginMatching, mapping: Mapping): PredictionPluginMatching {
  return {
    rule: matching.rule,
    match: matching.match,
    from: mapping.map(matching.from),
    to: mapping.map(matching.to, -1),
  }
}
