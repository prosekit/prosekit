import type { Selection } from '@prosekit/pm/state'

/**
 * @internal
 *
 * @deprecated Use the one from `@prosekit/core` instead.
 */
export function isInCodeBlock(selection: Selection) {
  const type = selection.$from.parent.type
  return type.spec.code && type.isBlock
}
