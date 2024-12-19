import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineSolidMarkView } from 'prosekit/solid'

import LinkView from './link-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineSolidMarkView({
      name: 'link',
      component: LinkView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
