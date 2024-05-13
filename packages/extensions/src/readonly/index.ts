import { definePlugin } from '@prosekit/core'
import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'

/**
 * Make the editor read-only.
 */
export function defineReadonly() {
  return definePlugin(plugin)
}

const plugin = new ProseMirrorPlugin({
  key: new PluginKey('prosekey-readonly'),
  props: {
    editable: () => false,
  },
})
