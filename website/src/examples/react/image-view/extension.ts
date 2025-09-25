import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineImageUploadHandler,
  type ImageAttrs as BaseImageAttrs,
} from 'prosekit/extensions/image'
import {
  defineReactNodeView,
  type ReactNodeViewComponent,
} from 'prosekit/react'

import ImageView from './image-view'
import { sampleUploader } from './upload-file'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineReactNodeView({
      name: 'image',
      component: ImageView satisfies ReactNodeViewComponent,
    }),
    defineImageUploadHandler(
      {
        uploader: sampleUploader,
      },
    ),
  )
}

export type ImageAttrs = BaseImageAttrs & {
  width: number | null
  height: number | null
}

export type EditorExtension = ReturnType<typeof defineExtension>
