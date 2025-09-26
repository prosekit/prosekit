import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import {
  defineSolidNodeView,
  type SolidNodeViewComponent,
} from 'prosekit/solid'

import ImageView from './image-view'
import { sampleUploader } from './sample-uploader'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineSolidNodeView({
      name: 'image',
      component: ImageView satisfies SolidNodeViewComponent,
    }),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
