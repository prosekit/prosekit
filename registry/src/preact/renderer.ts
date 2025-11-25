import {
  createElement,
  type JSX,
} from 'preact'
import { Suspense } from 'preact/compat'
import type { NodeJSON } from 'prosekit/core'

import { loaders } from './loaders.gen'

interface ExampleProps {
  initialContent?: NodeJSON
}

interface Props {
  story: string
  exampleProps?: ExampleProps
}

export function PreactRenderer(props: Props): JSX.Element {
  const Example = loaders[props.story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[PreactRenderer] No example found for story ${props.story}`)
  }
  const fallback = createElement('div', null)
  const children = Example ? createElement(Example, props.exampleProps ?? null) : null
  return createElement(Suspense, { fallback }, children)
}

PreactRenderer.displayName = 'PreactRenderer'
