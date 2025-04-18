import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import {
  PluginKey,
  ProseMirrorPlugin,
} from '@prosekit/pm/state'

/**
 * Make the editor read-only.
 */
export function defineReadonly(): PlainExtension {
  return definePlugin(plugin)
}

const plugin = new ProseMirrorPlugin({
  key: new PluginKey('prosekey-readonly'),
  props: {
    editable: () => false,
  },
})
