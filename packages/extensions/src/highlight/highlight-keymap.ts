import { defineKeymap, toggleMark, type PlainExtension } from '@prosekit/core'

/**
 * @internal
 */
export function defineHighlightKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-Shift-h': toggleMark({ type: 'highlight' }),
  })
}
