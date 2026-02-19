import { definePlugin, type PlainExtension } from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import { LoroSyncPlugin, type LoroSyncPluginProps } from 'loro-prosemirror'

export function defineLoroSyncPlugin(
  options: LoroSyncPluginProps,
): PlainExtension {
  return definePlugin(LoroSyncPlugin(options) as unknown as Plugin)
}
