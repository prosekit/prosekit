import {
  defineKeymap,
  type PlainExtension,
} from '@prosekit/core'

import { setParagraph } from './paragraph-commands'

/**
 * @internal
 */
export function defineParagraphKeymap(): PlainExtension {
  return defineKeymap({
    'mod-alt-0': setParagraph(),
  })
}
