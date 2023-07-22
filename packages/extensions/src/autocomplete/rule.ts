import type { EditorState, Transaction } from '@prosekit/pm/state'

import { defaultCanMatch } from './helpers'

export type MatchHandler = (options: {
  state: EditorState
  match: RegExpExecArray
  from: number
  to: number
  ignoreMatch: () => void
  deleteMatch: () => void
}) => Transaction | null | void

export class AutocompleteRule {
  readonly regex: RegExp
  readonly onMatch: MatchHandler
  readonly onLeave?: VoidFunction
  readonly canMatch: (options: { state: EditorState }) => boolean

  constructor(options: {
    regex: RegExp
    onEnter: MatchHandler
    onLeave?: VoidFunction
    canMatch?: (options: { state: EditorState }) => boolean
  }) {
    this.regex = options.regex
    this.onMatch = options.onEnter
    this.onLeave = options.onLeave
    this.canMatch = options.canMatch ?? defaultCanMatch
  }
}
