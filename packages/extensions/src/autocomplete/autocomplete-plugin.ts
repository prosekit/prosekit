import { OBJECT_REPLACEMENT_CHARACTER } from '@prosekit/core'
import type {
  ProseMirrorNode,
  ResolvedPos,
} from '@prosekit/pm/model'
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
        return { ignores: [], matching: null }
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
  const textTo = to + textAdded.length
  const textFrom = textTo - textFull.length

  const pluginState = getPluginState(view.state)
  const ignores = pluginState?.ignores ?? []

  const currMatching = matchRule(
    view.state,
    getRules(),
    textFull,
    textFrom,
    textTo,
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
  const ignoreSet = new Set<number>()
  for (const ignore of prevValue.ignores) {
    const result = tr.mapping.mapResult(ignore)
    if (!result.deletedBefore && !result.deletedAfter) {
      ignoreSet.add(result.pos)
    }
  }
  const ignores = Array.from(ignoreSet)

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
      ignores.push(prevMatching.from)
      return { matching: null, ignores }
    }

    // Get the text between the existing matching
    const text = getTextBetween(newState.doc, prevMatching.from, prevMatching.to)
    // Check the text again to see if it still matches the rule
    const currMatching = matchRule(
      newState,
      getRules(),
      text,
      prevMatching.from,
      prevMatching.to,
      ignores,
    )
    return { matching: currMatching ?? null, ignores }
  }

  // If a new matching is being entered from `handleTextInput`
  if (meta.type === 'enter') {
    // Ignore the previous matching if it is not the same as the new matching
    if (prevMatching && prevMatching.from !== meta.matching.from) {
      ignores.push(prevMatching.from)
    }

    // Return the new matching
    return { matching: meta.matching, ignores }
  }

  // If a matching is being exited
  if (meta.type === 'leave') {
    if (prevMatching) {
      ignores.push(prevMatching.from)
    }
    return { matching: null, ignores }
  }

  throw new Error(`Invalid transaction meta: ${meta satisfies never}`)
}

function handleUpdate(view: EditorView, prevState: EditorState): void {
  const prevValue = getPluginState(prevState)
  const currValue = getPluginState(view.state)

  if (!prevValue || !currValue) {
    // Should not happen
    return
  }

  const prevMatching = prevValue.matching
  const currMatching = currValue.matching

  // Deactivate the previous rule
  if (prevMatching && prevMatching.rule !== currMatching?.rule) {
    prevMatching.rule.onLeave?.()
  }

  // Activate the current rule
  if (currMatching) {
    const { from, to, match, rule } = currMatching

    const textSnapshot = getTextBetween(view.state.doc, from, to)

    const deleteMatch = () => {
      if (getTextBetween(view.state.doc, from, to) === textSnapshot) {
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
    const { from, to, match } = pluginState.matching
    const deco = Decoration.inline(from, to, {
      'class': 'prosekit-autocomplete-match',
      'data-autocomplete-match-text': match[0],
    })
    return DecorationSet.create(state.doc, [deco])
  }
  return null
}

const MAX_MATCH = 200

/** Get the text before the given position at the current block. */
function getTextBackward($pos: ResolvedPos): string {
  const parentOffset: number = $pos.parentOffset
  return getTextBetween(
    $pos.parent,
    Math.max(0, parentOffset - MAX_MATCH),
    parentOffset,
  )
}

function getTextBetween(node: ProseMirrorNode, from: number, to: number): string {
  return node.textBetween(
    from,
    to,
    null,
    OBJECT_REPLACEMENT_CHARACTER,
  )
}

function matchRule(
  state: EditorState,
  rules: AutocompleteRule[],
  text: string,
  textFrom: number,
  textTo: number,
  ignores: Array<number>,
): PredictionPluginMatching | undefined {
  // Find the rightmost ignore point within the text range
  let maxIgnore = -1
  for (const ignore of ignores) {
    if (ignore >= textFrom && ignore < textTo && ignore > maxIgnore) {
      maxIgnore = ignore
    }
  }

  // If an ignore point is within the text range, we ignore the text to the left
  // of the ignore point (including the character right after the ignore point).
  if (maxIgnore >= 0) {
    const cut = maxIgnore + 1 - textFrom
    text = text.slice(cut)
    textFrom += cut
  }

  if (textFrom >= textTo || !text) {
    return
  }

  for (const rule of rules) {
    if (!rule.canMatch({ state })) {
      continue
    }

    rule.regex.lastIndex = 0
    const match = rule.regex.exec(text)
    if (!match) {
      continue
    }

    const matchTo = textTo
    const matchFrom = textFrom + match.index

    return { rule, match, from: matchFrom, to: matchTo }
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
