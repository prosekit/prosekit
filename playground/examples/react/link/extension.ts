import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineLink } from 'prosekit/extensions/link'
import { defineReactMarkView } from 'prosekit/react'

import LinkView from './link-view'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineLink(),
    defineReactMarkView({
      name: 'link',
      component: LinkView,
      as: 'span',
      contentAs: 'span',
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
