import type { JSX } from 'solid-js'
import h from 'solid-js/h'

import { loaders } from './loaders.gen'

export function SolidRenderer({ story }: { story: string }): JSX.Element | JSX.FunctionElement {
  const Example = loaders[story as keyof typeof loaders]
  if (!Example) {
    console.warn(`[SolidRenderer] No example found for story ${story}`)
  }
  return Example ? h(Example, null) : null
}
