import type { NodeJSON } from 'prosekit/core'
import type { JSX } from 'solid-js'
import h from 'solid-js/h'

import { loaders } from './loaders.gen'

interface ExampleProps {
  defaultContent?: NodeJSON
}

export function SolidRenderer({ story, props }: { story: string; props?: ExampleProps }): JSX.Element | JSX.FunctionElement {
  const Example = loaders[story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[SolidRenderer] No example found for story ${story}`)
  }
  return Example ? h(Example, props) : null
}
