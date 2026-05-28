import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImage } from 'prosekit/extensions/image'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  defineReactMarkView,
  defineReactNodeView,
} from '@prosekit/react-binding'

import { ImageView } from './image-view.tsx'
import { LinkView } from './link-view.tsx'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Type here. Mod-b / Mod-i still work.' }),
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

export type EditorExtension = ReturnType<typeof defineExtension>
