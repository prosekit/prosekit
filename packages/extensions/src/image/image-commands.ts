import {
  defineCommands,
  insertNode,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

import type { ImageAttrs } from './image-spec'

/**
 * @internal
 */
export type ImageCommandsExtension = Extension<{
  Commands: {
    insertImage: [attrs?: ImageAttrs]
  }
}>

/**
 * @internal
 */
export function insertImage(attrs?: ImageAttrs): Command {
  return insertNode({ type: 'image', attrs })
}

/**
 * @internal
 */
export function defineImageCommands(): ImageCommandsExtension {
  return defineCommands({
    insertImage,
  })
}
