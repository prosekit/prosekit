import { definePlugin, type PlainExtension } from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import { ySyncPlugin } from 'y-prosemirror'
import type * as Y from 'yjs'

/**
 * Options for `y-prosemirror`'s `ySyncPlugin`.
 */
export type YjsSyncPluginOptions = NonNullable<
  Parameters<typeof ySyncPlugin>[1]
>

export interface YjsSyncOptions extends YjsSyncPluginOptions {
  fragment: Y.XmlFragment
}

export function defineYjsSyncPlugin(options: YjsSyncOptions): PlainExtension {
  const { fragment, ...rest } = options
  return definePlugin(ySyncPlugin(fragment, rest) as Plugin)
}
