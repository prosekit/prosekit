import { ResolvedPos } from '@prosekit/pm/model'
import { EditorState, PluginKey, Transaction } from '@prosekit/pm/state'

import type { AutocompleteRule } from './rule'

export function defaultCanMatch({ state }: { state: EditorState }): boolean {
  return state.selection.empty && !isInsideCode(state.selection.$from)
}

function isInsideCode($pos: ResolvedPos): boolean {
  for (let d = $pos.depth; d > 0; d--) {
    if ($pos.node(d).type.spec.code) {
      return true
    }
  }

  return $pos.marks().some((mark) => mark.type.name === 'code')
}

export const OBJECT_REPLACEMENT = '\uFFFC'

export interface PredictionPluginState {
  active: boolean
  ignore: number | null
  matching: {
    rule: AutocompleteRule
    from: number
    to: number
    match: RegExpExecArray
  } | null
}

export function getPluginState(state: EditorState) {
  return pluginKey.getState(state)
}

export function getTrMeta(tr: Transaction): PredictionPluginState {
  return tr.getMeta(pluginKey) as PredictionPluginState
}

export function setTrMeta(
  tr: Transaction,
  meta: PredictionPluginState,
): Transaction {
  return tr.setMeta(pluginKey, meta)
}

export const pluginKey = new PluginKey<PredictionPluginState>(
  'prosekit-autocomplete',
)
