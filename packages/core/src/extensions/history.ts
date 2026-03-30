import { history, redo, undo } from '@prosekit/pm/history'

import { union } from '../editor/union.ts'
import type { Extension } from '../types/extension.ts'
import { isApple } from '../utils/env.ts'

import { defineCommands } from './command.ts'
import { defineKeymap, type Keymap } from './keymap.ts'
import { definePlugin } from './plugin.ts'

const keymap: Keymap = {
  'Mod-z': undo,
  'Mod-Z': redo,
}

if (!isApple) {
  keymap['Mod-y'] = redo
}

const commands = {
  undo: () => undo,
  redo: () => redo,
} as const

/**
 * Options for {@link defineHistory}.
 *
 * @public
 */
export interface HistoryOptions {
  /**
   * The amount of history events that are collected before the oldest events
   * are discarded.
   *
   * @default 200
   */
  depth?: number

  /**
   * The delay in milliseconds between changes after which a new group should be
   * started.
   *
   * @default 250
   */
  newGroupDelay?: number
}

/**
 * @internal
 */
export type HistoryExtension = Extension<{
  Commands: {
    undo: []
    redo: []
  }
}>

/**
 * Add undo/redo history to the editor.
 *
 * @param options
 *
 * @public
 */
export function defineHistory({
  depth = 200,
  newGroupDelay = 250,
}: HistoryOptions = {}): HistoryExtension {
  return union(
    definePlugin(history({ depth, newGroupDelay })),
    defineKeymap(keymap),
    defineCommands(commands),
  )
}
