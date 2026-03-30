import { defineCommands, type Extension } from '@prosekit/core'

import { insertImage } from './image-commands/insert-image.ts'
import { uploadImage, type UploadImageOptions } from './image-commands/upload-image.ts'
import type { ImageAttrs } from './image-spec.ts'

/**
 * @internal
 */
export type ImageCommandsExtension = Extension<{
  Commands: {
    insertImage: [attrs?: ImageAttrs]
    uploadImage: [options: UploadImageOptions]
  }
}>

/**
 * @internal
 */
export function defineImageCommands(): ImageCommandsExtension {
  return defineCommands({
    insertImage,
    uploadImage,
  })
}
