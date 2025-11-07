import type { JSX } from 'react'
import {
  createElement,
  Suspense,
} from 'react'

import { loaders } from './loaders.gen'

export function ReactRenderer({ story }: { story: string }): JSX.Element {
  const Example = loaders[story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[ReactRenderer] No example found for story ${story}`)
  }
  const fallback = createElement('div', null)
  const children = Example ? createElement(Example, null) : null
  return createElement(Suspense, { fallback }, children)
}

ReactRenderer.displayName = 'ReactRenderer'
