import type { JSX } from 'react'
import {
  createElement,
  Suspense,
} from 'react'

import { loaders } from './loaders.gen'

export function ReactExample({ story }: { story: string }): JSX.Element {
  const Example = loaders[story as keyof typeof loaders]
  const fallback = createElement('div', null)
  const children = Example ? createElement(Example, null) : null
  return createElement(Suspense, { fallback }, children)
}

ReactExample.displayName = 'ReactExample'
