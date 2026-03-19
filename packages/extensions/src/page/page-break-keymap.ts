import { defineKeymap, type PlainExtension } from '@prosekit/core'

import { insertPageBreak } from './page-break-commands.ts'

/**
 * @internal
 */
export type PageBreakKeymapExtension = PlainExtension

/**
 * @internal
 */
export function definePageBreakKeymap(): PageBreakKeymapExtension {
  return defineKeymap({
    'Mod-Enter': insertPageBreak(),
  })
}
