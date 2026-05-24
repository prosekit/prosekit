import type { Selection } from '@prosekit/pm/state'

import { isCodeBlockType } from './is-code-block-type.ts'

/**
 * Check if the selection is in a code block.
 *
 * @internal
 */
export function isInCodeBlock(selection: Selection): boolean {
  return (
    isCodeBlockType(selection.$from.parent.type)
    || isCodeBlockType(selection.$to.parent.type)
  )
}
