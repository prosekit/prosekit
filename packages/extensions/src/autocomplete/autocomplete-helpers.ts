import type { ResolvedPos } from '@prosekit/pm/model'
import {
  PluginKey,
  type EditorState,
  type Transaction,
} from '@prosekit/pm/state'

import type { AutocompleteRule } from './autocomplete-rule'

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

/**
 * @internal
 */
export interface PredictionPluginMatching {
  rule: AutocompleteRule
  from: number
  to: number
  match: RegExpExecArray
}

/**
 * @internal
 */
export interface PredictionPluginState {
  /**
   * The matching positions that should be ignored.
   */
  ignores: number[]

  /**
   * The current active matching.
   */
  matching: PredictionPluginMatching | null
}

/**
 * @internal
 */
export interface PredictionTransactionMeta {
  /**
   * The from position that should be ignored.
   */
  ignore: number
}

export function getPluginState(state: EditorState): PredictionPluginState | undefined {
  return pluginKey.getState(state)
}

export function getTrMeta(tr: Transaction): PredictionTransactionMeta | undefined {
  return tr.getMeta(pluginKey) as PredictionTransactionMeta | undefined
}

export function setTrMeta(
  tr: Transaction,
  meta: PredictionTransactionMeta,
): Transaction {
  return tr.setMeta(pluginKey, meta)
}

export const pluginKey: PluginKey<PredictionPluginState> = new PluginKey<PredictionPluginState>('prosekit-autocomplete')
