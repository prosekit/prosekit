import { definePlugin } from '@prosekit/core'
import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'

/**
 * Make the editor read-only.
 */
export function defineReadonly() {
  return definePlugin(plugin)
}

const key = new PluginKey('readonly')

const plugin = new ProseMirrorPlugin({
  key,
  props: {
    editable: () => false,
  },
})
