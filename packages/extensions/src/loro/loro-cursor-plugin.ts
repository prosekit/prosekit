import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import type {
  EditorState,
  Plugin,
  Selection,
} from '@prosekit/pm/state'
import type { DecorationAttrs } from '@prosekit/pm/view'
import type { PeerID } from 'loro-crdt'
import type { CursorEphemeralStore } from 'loro-prosemirror'
import {
  LoroCursorPlugin,
  LoroEphemeralCursorPlugin,
  type CursorAwareness,
} from 'loro-prosemirror'

// TODO: Re-use it from loro-prosemirror
export interface CursorPluginOptions {
  getSelection?: (state: EditorState) => Selection
  createCursor?: (user: PeerID) => Element
  createSelection?: (user: PeerID) => DecorationAttrs
}

export interface LoroCursorOptions extends CursorPluginOptions {
  awareness?: CursorAwareness
  presence?: CursorEphemeralStore
}

export function defineLoroCursorPlugin(
  options: LoroCursorOptions,
): PlainExtension {
  return definePlugin(createLoroCursorPlugin(options))
}

function createLoroCursorPlugin(options: LoroCursorOptions): Plugin {
  const { awareness, presence, ...rest } = options
  if (awareness && presence) {
    throw new Error('Only one of awareness and presence can be provided')
  } else if (awareness) {
    return LoroCursorPlugin(awareness, rest)
  } else if (presence) {
    return LoroEphemeralCursorPlugin(presence, rest)
  } else {
    throw new Error('Either awareness or presence must be provided')
  }
}
