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

interface Props {
  story: string
  exampleProps?: ExampleProps
}

export function ReactRenderer(props: Props): JSX.Element {
  const Example = loaders[props.story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[ReactRenderer] No example found for story ${props.story}`)
  }
  const fallback = createElement('div', { 'data-testid': 'react-renderer-fallback' }, null)
  const children = Example ? createElement(Example, props.exampleProps ?? null) : null
  return createElement(Suspense, { fallback }, children)
}

ReactRenderer.displayName = 'ReactRenderer'
