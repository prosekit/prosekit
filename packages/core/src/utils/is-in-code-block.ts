import type { Selection } from '@prosekit/pm/state'

/**
 * @internal
 */
export function isInCodeBlock(selection: Selection) {
  const type = selection.$from.parent.type
  return type.spec.code && type.isBlock
}
