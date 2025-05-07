import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import { Plugin } from '@prosekit/pm/state'
import {
  createListEventPlugin,
  createListRenderingPlugin,
  createSafariInputMethodWorkaroundPlugin,
  unwrapListSlice,
} from 'prosemirror-flat-list'

function createListClipboardPlugin(): Plugin {
  return new Plugin({
    props: {
      transformCopied: unwrapListSlice,
    },
  })
}

function createListPlugins(): Plugin[] {
  return [
    createListEventPlugin(),
    createListRenderingPlugin(),
    createListClipboardPlugin(),
    createSafariInputMethodWorkaroundPlugin(),
  ]
}

/**
 * @internal
 */
export function defineListPlugins(): PlainExtension {
  return definePlugin(createListPlugins)
}
