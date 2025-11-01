import {
  createElement,
  type JSX,
} from 'preact'
import { Suspense } from 'preact/compat'

import { loaders } from './loaders.gen'

export function PreactExample({ story }: { story: string }): JSX.Element {
  const Example = loaders[story as keyof typeof loaders]
  const fallback = createElement('div', null)
  const children = Example ? createElement(Example, null) : null
  return createElement(Suspense, { fallback }, children)
}

PreactExample.displayName = 'PreactExample'
