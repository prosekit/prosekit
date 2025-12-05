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
    'Mod-Alt-0': setParagraph(),
  })
}
