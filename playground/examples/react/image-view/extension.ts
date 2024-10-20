import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import type { ImageAttrs as BaseImageAttrs } from 'prosekit/extensions/image'
import {
  type ReactNodeViewComponent,
  defineReactNodeView,
} from 'prosekit/react'

import ImageView from './image-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineReactNodeView({
      name: 'image',
      component: ImageView satisfies ReactNodeViewComponent,
    }),
  )
}

export type ImageAttrs = BaseImageAttrs & {
  width: number | null
  height: number | null
}

export type EditorExtension = ReturnType<typeof defineExtension>