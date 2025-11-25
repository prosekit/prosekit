import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImageUploadHandler } from 'prosekit/extensions/image'

import { sampleUploader } from '../../sample/sample-uploader'
import { defineImageView } from '../../ui/image-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineImageView(),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
