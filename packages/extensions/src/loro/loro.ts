import {
  Priority,
  union,
  withPriority,
  type PlainExtension,
  type Union,
} from '@prosekit/core'
import type {
  CursorAwareness,
  CursorEphemeralStore,
  CursorPluginOptions,
  LoroDocType,
  LoroSyncPluginProps,
  LoroUndoPluginProps,
} from 'loro-prosemirror'

import {
  defineLoroCommands,
  type LoroCommandsExtension,
} from './loro-commands'
import { defineLoroCursorPlugin } from './loro-cursor-plugin'
import { defineLoroKeymap } from './loro-keymap'
import { defineLoroSyncPlugin } from './loro-sync-plugin'
import { defineLoroUndoPlugin } from './loro-undo-plugin'

export interface LoroOptions {
  /**
   * The Loro instance handles the state of shared data.
   */
  doc: LoroDocType

  /**
   * The (legacy) Awareness instance. One of `awareness` or `presence` must be provided.
   */
  awareness?: CursorAwareness

  /**
   * The CursorEphemeralStore instance. One of `awareness` or `presence` must be provided.
   */
  presence?: CursorEphemeralStore

  /**
   * Extra options for `LoroSyncPlugin`.
   */
  sync?: Omit<LoroSyncPluginProps, 'doc'>

  /**
   * Extra options for the `LoroUndoPlugin`.
   */
  undo?: Omit<LoroUndoPluginProps, 'doc'>

  /**
   * Extra options for `LoroCursorPlugin` or `LoroEphemeralCursorPlugin`.
   */
  cursor?: CursorPluginOptions
}

/**
 * @internal
 */
export type LoroExtension = Union<[LoroCommandsExtension, PlainExtension]>

/**
 * @public
 */
export function defineLoro(options: LoroOptions): LoroExtension {
  const { doc, awareness, presence, sync, undo, cursor } = options

  return withPriority(
    union([
      defineLoroKeymap(),
      defineLoroCommands(),
      defineLoroCursorPlugin({ ...cursor, awareness, presence }),
      defineLoroUndoPlugin({ ...undo, doc }),
      defineLoroSyncPlugin({ ...sync, doc }),
    ]),
    Priority.high,
  )
}
