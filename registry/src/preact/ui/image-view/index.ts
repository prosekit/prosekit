import type { Extension } from 'prosekit/core'
import {
  definePreactNodeView,
  type PreactNodeViewComponent,
} from 'prosekit/preact'

import ImageView from './image-view'

export function defineImageView(): Extension {
  return definePreactNodeView({
    name: 'image',
    component: ImageView satisfies PreactNodeViewComponent,
  })
}
