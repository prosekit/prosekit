import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCallout } from 'prosekit/extensions/callout'
import { defineReactNodeView } from 'prosekit/react'

import CalloutView from './callout-view.tsx'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineCallout(),
    defineReactNodeView({
      name: 'callout',
      component: CalloutView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
