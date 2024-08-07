import { definePlugin } from '@prosekit/core'
import type { Plugin } from '@prosekit/pm/state'
import { yCursorPlugin } from 'y-prosemirror'
import type { Awareness } from 'y-protocols/awareness'

export type YjsCursorOptions = Parameters<typeof yCursorPlugin>[1]

export function defineYjsCursorPlugin(
  awareness: Awareness,
  options?: YjsCursorOptions,
) {
  return definePlugin(yCursorPlugin(awareness, options) as Plugin)
}
