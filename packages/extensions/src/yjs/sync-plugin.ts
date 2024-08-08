import { definePlugin } from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import { ySyncPlugin } from 'y-prosemirror'
import * as Y from 'yjs'

export type YjsSyncOptions = Parameters<typeof ySyncPlugin>[1] & {
  fragment: Y.XmlFragment
}

export function defineYjsSyncPlugin(options: YjsSyncOptions) {
  return definePlugin(ySyncPlugin(options.fragment, options) as Plugin)
}
