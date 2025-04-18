import {
  defineKeymap,
  toggleMark,
  type PlainExtension,
} from '@prosekit/core'

/**
 * @internal
 */
export function defineItalicKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-i': toggleMark({ type: 'italic' }),
  })
}
