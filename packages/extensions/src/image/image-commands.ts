import {
  defineCommands,
  insertNode,
  type Extension,
} from '@prosekit/core'

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
export function defineImageCommands(): ImageCommandsExtension {
  return defineCommands({
    insertImage: (attrs?: ImageAttrs) => {
      return insertNode({ type: 'image', attrs })
    },
  })
}
