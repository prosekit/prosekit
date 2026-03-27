import type { Extension } from 'prosekit/core'
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'

import ImageView from './image-view.vue'

export function defineImageView(): Extension {
  return defineVueNodeView({
    name: 'image',
    component: ImageView as VueNodeViewComponent,
  })
}
