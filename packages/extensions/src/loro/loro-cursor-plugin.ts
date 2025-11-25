import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import type {
  CursorEphemeralStore,
  CursorPluginOptions,
} from 'loro-prosemirror'
import {
  LoroCursorPlugin,
  LoroEphemeralCursorPlugin,
  type CursorAwareness,
} from 'loro-prosemirror'

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
