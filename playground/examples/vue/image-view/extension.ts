import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'

import ImageView from './image-view.vue'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineVueNodeView({
      name: 'image',
      component: ImageView as VueNodeViewComponent,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
