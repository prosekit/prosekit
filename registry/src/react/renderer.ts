import type { NodeJSON } from 'prosekit/core'
import type { JSX } from 'react'
import {
  createElement,
  Suspense,
} from 'react'

import { loaders } from './loaders.gen'

interface ExampleProps {
  initialContent?: NodeJSON
}

export function ReactRenderer({ story, props }: { story: string; props?: ExampleProps }): JSX.Element {
  const Example = loaders[story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[ReactRenderer] No example found for story ${story}`)
  }
  const fallback = createElement('div', null)
  const children = Example ? createElement(Example, props) : null
  return createElement(Suspense, { fallback }, children)
}

ReactRenderer.displayName = 'ReactRenderer'
