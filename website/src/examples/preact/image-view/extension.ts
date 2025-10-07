import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import {
  definePreactNodeView,
  type PreactNodeViewComponent,
} from 'prosekit/preact'

import ImageView from './image-view'
import { sampleUploader } from './sample-uploader'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePreactNodeView({
      name: 'image',
      component: ImageView satisfies PreactNodeViewComponent,
    }),
    defineImageUploadHandler(
      {
        uploader: sampleUploader,
      },
    ),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
