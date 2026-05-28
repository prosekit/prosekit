import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImage } from 'prosekit/extensions/image'
import {
  defineReactMarkView,
  defineReactNodeView,
} from '@prosekit/react-binding'

import { LinkView } from './link-view.tsx'
import { ImageView } from './image-view.tsx'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineImage(),
    defineReactMarkView({
      name: 'link',
      component: LinkView,
    }),
    defineReactNodeView({
      name: 'image',
      component: ImageView,
    }),
  )
}
