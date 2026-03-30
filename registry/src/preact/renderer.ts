import { createElement, type JSX } from 'preact'
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
  const fallback = createElement('div', { 'data-testid': 'preact-renderer-fallback' }, null)
  const children = Example ? createElement(Example, props.exampleProps ?? null) : `Example ${props.story} not found`
  return createElement(Suspense, { fallback }, children)
}

PreactRenderer.displayName = 'PreactRenderer'
