import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import {
  defineVueNodeView,
  type VueNodeViewComponent,
} from 'prosekit/vue'

import ImageView from './image-view.vue'
import { sampleUploader } from './sample-uploader'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineVueNodeView({
      name: 'image',
      component: ImageView as VueNodeViewComponent,
    }),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
