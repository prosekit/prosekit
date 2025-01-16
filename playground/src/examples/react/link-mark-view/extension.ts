import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineReactMarkView } from 'prosekit/react'

import LinkView from './link-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineReactMarkView({
      name: 'link',
      component: LinkView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
