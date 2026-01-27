import {
  Priority,
  union,
  withPriority,
  type PlainExtension,
  type Union,
} from '@prosekit/core'
import type * as Y from 'yjs'

import {
  defineYjsCommands,
  type YjsCommandsExtension,
} from './yjs-commands'
import {
  defineYjsCursorPlugin,
  type YjsCursorPluginOptions,
} from './yjs-cursor-plugin'
import { defineYjsKeymap } from './yjs-keymap'
import {
  defineYjsSyncPlugin,
  type YjsSyncPluginOptions,
} from './yjs-sync-plugin'
import type { Awareness } from './yjs-types'
import {
  defineYjsUndoPlugin,
  type YjsUndoPluginOptions,
} from './yjs-undo-plugin'

export interface YjsOptions {
  /**
   * The Yjs instance handles the state of shared data.
   */
  doc: Y.Doc

  /**
   * The Awareness instance.
   */
  awareness: Awareness

  /**
   * The Yjs XmlFragment to use. If not provided,
   * `doc.getXmlFragment('prosemirror')` will be used.
   */
  fragment?: Y.XmlFragment

  /**
   * Options for `y-prosemirror`'s `ySyncPlugin`.
   */
  sync?: YjsSyncPluginOptions

  /**
   * Options for the `y-prosemirror`'s `yUndoPlugin`.
   */
  undo?: YjsUndoPluginOptions

  /**
   * Options for `y-prosemirror`'s `yCursorPlugin`.
   */
  cursor?: YjsCursorPluginOptions
}

/**
 * @internal
 */
export type YjsExtension = Union<[YjsCommandsExtension, PlainExtension]>

/**
 * @public
 */
export function defineYjs(options: YjsOptions): YjsExtension {
  const { doc, awareness, sync, undo, cursor } = options
  const fragment = options.fragment ?? doc.getXmlFragment('prosemirror')

  return withPriority(
    union([
      defineYjsKeymap(),
      defineYjsCommands(),
      defineYjsCursorPlugin({ ...cursor, awareness }),
      defineYjsUndoPlugin({ ...undo }),
      defineYjsSyncPlugin({ ...sync, fragment }),
    ]),
    Priority.high,
  )
}
