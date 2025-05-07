import {
  defineKeymap,
  type PlainExtension,
} from '@prosekit/core'

import { insertHardBreak } from './hard-break-commands'

/**
 * @internal
 */
export function defineHardBreakKeymap(): PlainExtension {
  return defineKeymap({
    'Mod-Enter': insertHardBreak(),
    'Shift-Enter': insertHardBreak(),
  })
}
