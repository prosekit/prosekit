import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import {
  LoroUndoPlugin,
  type LoroUndoPluginProps,
} from 'loro-prosemirror'

export function defineLoroUndoPlugin(options: LoroUndoPluginProps): PlainExtension {
  return definePlugin(LoroUndoPlugin(options))
}
