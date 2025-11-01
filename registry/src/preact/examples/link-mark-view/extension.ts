import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePreactMarkView } from 'prosekit/preact'

import LinkView from './link-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePreactMarkView({
      name: 'link',
      component: LinkView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
