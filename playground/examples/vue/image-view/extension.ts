import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'

import ImageView from './image-view.vue'
import { defineImageFileHandlers } from './upload-file'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineVueNodeView({
      name: 'image',
      component: ImageView as VueNodeViewComponent,
    }),
    defineImageFileHandlers(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
