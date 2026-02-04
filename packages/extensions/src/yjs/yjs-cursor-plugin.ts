import { definePlugin, type PlainExtension } from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import { yCursorPlugin } from 'y-prosemirror'

import type { Awareness } from './yjs-types'

/**
 * Options for `y-prosemirror`'s `yCursorPlugin`.
 */
export type YjsCursorPluginOptions = NonNullable<
  Parameters<typeof yCursorPlugin>[1]
>

export interface YjsCursorOptions extends YjsCursorPluginOptions {
  awareness: Awareness
}

export function defineYjsCursorPlugin(
  options: YjsCursorOptions,
): PlainExtension {
  const { awareness, ...rest } = options
  return definePlugin(yCursorPlugin(awareness, rest) as Plugin)
}
