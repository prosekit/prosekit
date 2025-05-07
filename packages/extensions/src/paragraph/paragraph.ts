import {
  Priority,
  union,
  withPriority,
  type Union,
} from '@prosekit/core'

import {
  defineParagraphCommands,
  type ParagraphCommandsExtension,
} from './paragraph-commands'
import { defineParagraphKeymap } from './paragraph-keymap'
import {
  defineParagraphSpec,
  type ParagraphSpecExtension,
} from './paragraph-spec'

/**
 * @internal
 */
export type ParagraphExtension = Union<[ParagraphSpecExtension, ParagraphCommandsExtension]>

/**
 * @public
 *
 * Defines a paragraph node.
 *
 * The paragraph node spec has the highest priority, because it should be the
 * default block node for most cases.
 */
export function defineParagraph(): ParagraphExtension {
  return union(
    withPriority(defineParagraphSpec(), Priority.highest),
    defineParagraphCommands(),
    defineParagraphKeymap(),
  )
}
