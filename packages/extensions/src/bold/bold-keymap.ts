import {
  defineKeymap,
  toggleMark,
  type PlainExtension,
} from '@prosekit/core'

/**
 * @internal
 */
export function defineBoldKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-b': toggleMark({ type: 'bold' }),
  })
}
