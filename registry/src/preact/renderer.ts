import {
  createElement,
  type JSX,
} from 'preact'
import { Suspense } from 'preact/compat'
import type { NodeJSON } from 'prosekit/core'

import { loaders } from './loaders.gen'

interface ExampleProps {
  defaultContent?: NodeJSON
}

export function PreactRenderer({ story, props }: { story: string; props?: ExampleProps }): JSX.Element {
  const Example = loaders[story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[PreactRenderer] No example found for story ${story}`)
  }
  const fallback = createElement('div', null)
  const children = Example ? createElement(Example, props ?? null) : null
  return createElement(Suspense, { fallback }, children)
}

PreactRenderer.displayName = 'PreactRenderer'
