import {
  type PlainExtension,
  type Union,
  Priority,
  union,
  withPriority,
} from '@prosekit/core'
import type {
  CursorAwareness,
  LoroDocType,
  LoroSyncPluginProps,
  LoroUndoPluginProps,
} from 'loro-prosemirror'

import { type LoroCommandsExtension, defineLoroCommands } from './commands'
import { type LoroCursorOptions, defineLoroCursorPlugin } from './cursor-plugin'
import { defineLoroKeymap } from './keymap'
import { defineLoroSyncPlugin } from './sync-plugin'
import { defineLoroUndoPlugin } from './undo-plugin'

export interface YjsOptions {
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
export function defineYjs(options: YjsOptions): LoroExtension {
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

export {
  defineLoroCommands,
  defineLoroCursorPlugin,
  defineLoroKeymap,
  defineLoroSyncPlugin,
  defineLoroUndoPlugin,
  type LoroCursorOptions,
  type LoroSyncPluginProps,
  type LoroUndoPluginProps,
}
