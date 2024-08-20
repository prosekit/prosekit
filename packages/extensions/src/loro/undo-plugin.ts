import { definePlugin } from '@prosekit/core'

import { LoroUndoPlugin, type LoroUndoPluginProps } from 'loro-prosemirror'

export function defineLoroUndoPlugin(options: LoroUndoPluginProps) {
  return definePlugin(LoroUndoPlugin(options))
}
