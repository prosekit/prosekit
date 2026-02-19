import { definePlugin, type PlainExtension } from '@prosekit/core'
import { LoroSyncPlugin, type LoroSyncPluginProps } from 'loro-prosemirror'

export function defineLoroSyncPlugin(
  options: LoroSyncPluginProps,
): PlainExtension {
  return definePlugin(LoroSyncPlugin(options))
}
