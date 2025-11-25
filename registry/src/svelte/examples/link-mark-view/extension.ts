import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineSvelteMarkView } from 'prosekit/svelte'

import LinkView from './link-view.svelte'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineSvelteMarkView({
      name: 'link',
      component: LinkView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
