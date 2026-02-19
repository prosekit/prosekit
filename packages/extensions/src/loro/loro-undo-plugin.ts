import { definePlugin, type PlainExtension } from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import { LoroUndoPlugin, type LoroUndoPluginProps } from 'loro-prosemirror'

export function defineLoroUndoPlugin(options: LoroUndoPluginProps): PlainExtension {
  return definePlugin(LoroUndoPlugin(options) as unknown as Plugin)
}
