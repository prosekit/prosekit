import {
  Priority,
  union,
  withPriority,
  type PlainExtension,
  type Union,
} from '@prosekit/core'
import type {
  CursorAwareness,
  LoroDocType,
  LoroSyncPluginProps,
  LoroUndoPluginProps,
} from 'loro-prosemirror'

import {
  defineLoroCommands,
  type LoroCommandsExtension,
} from './loro-commands'
import {
  defineLoroCursorPlugin,
  type LoroCursorOptions,
} from './loro-cursor-plugin'
import { defineLoroKeymap } from './loro-keymap'
import { defineLoroSyncPlugin } from './loro-sync-plugin'
import { defineLoroUndoPlugin } from './loro-undo-plugin'

export interface LoroOptions {
  /**
   * The Loro instance handles the state of shared data.
   */
  doc: LoroDocType

  /**
   * The Awareness instance.
   */
  awareness: CursorAwareness

  /**
   * Extra options for `LoroSyncPlugin`.
   */
  sync?: Omit<LoroSyncPluginProps, 'doc'>

  /**
   * Extra options for the `LoroUndoPlugin`.
   */
  undo?: Omit<LoroUndoPluginProps, 'doc'>

  /**
   * Extra options for `LoroCursorPlugin`.
   */
  cursor?: Omit<LoroCursorOptions, 'awareness'>
}

/**
 * @internal
 */
export type LoroExtension = Union<[LoroCommandsExtension, PlainExtension]>

/**
 * @public
 */
export function defineLoro(options: LoroOptions): LoroExtension {
  const { doc, awareness, sync, undo, cursor } = options

  return withPriority(
    union([
      defineLoroKeymap(),
      defineLoroCommands(),
      defineLoroCursorPlugin({ ...cursor, awareness }),
      defineLoroUndoPlugin({ ...undo, doc }),
      defineLoroSyncPlugin({ ...sync, doc }),
    ]),
    Priority.high,
  )
}
