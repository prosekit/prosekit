import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineImageUploadHandler,
} from 'prosekit/extensions/image'
import {
  defineReactNodeView,
  type ReactNodeViewComponent,
} from 'prosekit/react'

import ImageView from './image-view'
import { sampleUploader } from './sample-uploader'

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



export type EditorExtension = ReturnType<typeof defineExtension>
