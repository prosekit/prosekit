import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineVueMarkView,
  type VueMarkViewComponent,
} from 'prosekit/vue'

import LinkView from './link-view.vue'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineVueMarkView({
      name: 'link',
      component: LinkView as VueMarkViewComponent,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
