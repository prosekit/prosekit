import type { Extension } from 'prosekit/core'
import { defineReactNodeView, type ReactNodeViewComponent } from 'prosekit/react'

import ImageView from './image-view.tsx'

export function defineImageView(): Extension {
  return defineReactNodeView({
    name: 'image',
    component: ImageView satisfies ReactNodeViewComponent,
  })
}
