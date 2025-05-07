import {
  defineKeymap,
  toggleMark,
  type PlainExtension,
} from '@prosekit/core'

/**
 * @internal
 */
export function defineCodeKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-e': toggleMark({ type: 'code' }),
  })
}
