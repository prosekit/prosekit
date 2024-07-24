import {
  defineCommands,
  defineKeymap,
  definePlugin,
  isApple,
  Priority,
  union,
  withPriority,
  type Keymap,
} from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import { yCursorPlugin, ySyncPlugin } from 'y-prosemirror'
import { Awareness } from 'y-protocols/awareness'
import * as Y from 'yjs'

import { redo, undo, yUndoPlugin, type YUndoOpts } from './undo-plugin'

export type YSyncOpts = Parameters<typeof ySyncPlugin>[1]

function defineSyncPlugin(fragment: Y.XmlFragment, opts?: YSyncOpts) {
  return definePlugin(ySyncPlugin(fragment, opts) as Plugin)
}

function defineUndoPlugin(opts: YUndoOpts) {
  return definePlugin(yUndoPlugin(opts))
}

const keymap: Keymap = {
  'Mod-z': undo,
  'Shift-Mod-z': redo,
}

if (!isApple) {
  keymap['Mod-y'] = redo
}

const commands = {
  undo: () => undo,
  redo: () => redo,
} as const

export type YCursorOpts = Parameters<typeof yCursorPlugin>[1]

function defineCursorPlugin(awareness: Awareness, options?: YCursorOpts) {
  return definePlugin(yCursorPlugin(awareness, options) as Plugin)
}

export interface YjsOptions {
  fragment?: Y.XmlFragment | string

  ySyncOptions?: YSyncOpts

  yUndoOptions?: YUndoOpts

  yCursorOptions?: YCursorOpts
}

/**
 * @public
 */
export function defineYjs(
  doc: Y.Doc,
  awareness: Awareness,
  options?: YjsOptions,
) {
  const { fragment, ySyncOptions, yUndoOptions, yCursorOptions } = options ?? {}
  const concreteFragment =
    fragment == null
      ? doc.getXmlFragment('prosemirror')
      : typeof fragment === 'string'
        ? doc.getXmlFragment(fragment)
        : fragment
  return withPriority(
    union([
      defineKeymap(keymap),
      defineCommands(commands),
      defineCursorPlugin(awareness, yCursorOptions),
      defineUndoPlugin(yUndoOptions),
      defineSyncPlugin(concreteFragment, ySyncOptions),
    ]),
    Priority.high,
  )
}
