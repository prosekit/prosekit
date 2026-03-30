import { union, type Union } from '@prosekit/core'

import { definePageBreakCommands, type PageBreakCommandsExtension } from './page-break-commands.ts'
import { definePageBreakKeymap, type PageBreakKeymapExtension } from './page-break-keymap.ts'
import { definePageBreakSpec, type PageBreakSpecExtension } from './page-break-spec.ts'

/**
 * @internal
 */
export type PageBreakExtension = Union<
  [PageBreakSpecExtension, PageBreakCommandsExtension, PageBreakKeymapExtension]
>

/**
 * @public
 */
export function definePageBreak(): PageBreakExtension {
  return union(
    definePageBreakSpec(),
    definePageBreakCommands(),
    definePageBreakKeymap(),
  )
}
