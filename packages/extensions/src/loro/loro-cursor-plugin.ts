import { definePlugin, type PlainExtension } from '@prosekit/core'
import type { EditorState, Selection } from '@prosekit/pm/state'
import type { DecorationAttrs } from '@prosekit/pm/view'
import type { PeerID } from 'loro-crdt'
import { type CursorAwareness, LoroCursorPlugin } from 'loro-prosemirror'

export interface LoroCursorOptions {
  awareness: CursorAwareness
  getSelection?: (state: EditorState) => Selection
  createCursor?: (user: PeerID) => Element
  createSelection?: (user: PeerID) => DecorationAttrs
}

export function defineLoroCursorPlugin(
  options: LoroCursorOptions,
): PlainExtension {
  const { awareness, ...rest } = options
  return definePlugin(LoroCursorPlugin(awareness, rest))
}
