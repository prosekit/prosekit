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
    'mod-enter': insertHardBreak(),
    'shift-enter': insertHardBreak(),
  })
}
