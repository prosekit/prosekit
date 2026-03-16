import { union, type Union } from '@prosekit/core'

import { definePageBreakCommands, type PageBreakCommandsExtension } from './page-break-commands.ts'
import { definePageBreakSpec, type PageBreakSpecExtension } from './page-break-spec.ts'

/**
 * @internal
 */
export type PageBreakExtension = Union<
  [PageBreakSpecExtension, PageBreakCommandsExtension]
>

/**
 * @public
 */
export function definePageBreak(): PageBreakExtension {
  return union(
    definePageBreakSpec(),
    definePageBreakCommands(),
  )
}
