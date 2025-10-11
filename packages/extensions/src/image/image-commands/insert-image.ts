import { insertNode } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

import type { ImageAttrs } from '../image-spec'

/**
 * Returns a command that inserts an image node with the given attributes at the
 * current selection position.
 *
 * @public
 */
export function insertImage(attrs?: ImageAttrs): Command {
  return insertNode({ type: 'image', attrs })
}
