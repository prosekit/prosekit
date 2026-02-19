import { defineKeymap, type PlainExtension } from '@prosekit/core'

import { setParagraph } from './paragraph-commands.ts'

/**
 * @internal
 */
export function defineParagraphKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-Alt-0': setParagraph(),
  })
}
