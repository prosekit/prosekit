import { defineBasicExtension } from 'prosekit/basic'
import { defineNodeAttr, union } from 'prosekit/core'
import type { ImageAttrs as BaseImageAttrs } from 'prosekit/extensions/image'
import {
  type ReactNodeViewComponent,
  defineReactNodeView,
} from 'prosekit/react'

import ImageView from './image-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),

    defineNodeAttr({
      type: 'image',
      attr: 'width',
      default: null,
    }),
    defineNodeAttr({
      type: 'image',
      attr: 'height',
      default: null,
    }),

    defineReactNodeView({
      name: 'image',
      as: 'div',
      contentAs: 'div',
      component: ImageView satisfies ReactNodeViewComponent,
    }),
  )
}

export type ImageAttrs = BaseImageAttrs & {
  width: number | null
  height: number | null
}

export type EditorExtension = ReturnType<typeof defineExtension>
