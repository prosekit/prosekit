import { defineKeymap, toggleMark } from '@prosekit/core'

/**
 * @internal
 */
export function defineBoldKeymap() {
  return defineKeymap({
    'Mod-b': toggleMark({ type: 'bold' }),
  })
}
