import type { NodeJSON } from 'prosekit/core'
import type { JSX } from 'solid-js'
import h from 'solid-js/h'

import { loaders } from './loaders.gen'

interface ExampleProps {
  initialContent?: NodeJSON
}

interface Props {
  story: string
  exampleProps?: ExampleProps
}

export function SolidRenderer(props: Props): JSX.Element | JSX.FunctionElement {
  const Example = loaders[props.story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[SolidRenderer] No example found for story ${props.story}`)
  }
  return Example ? h(Example, props.exampleProps ?? null) : null
}
