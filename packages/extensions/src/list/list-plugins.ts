import { definePlugin } from '@prosekit/core'
import { createListPlugins } from 'prosemirror-flat-list'

/**
 * @internal
 */
export function defineListPlugins() {
  return definePlugin(({ schema }) => createListPlugins({ schema }))
}
