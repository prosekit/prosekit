import type { JSX } from 'solid-js'
import h from 'solid-js/h'

import { loaders } from './loaders.gen'

export function SolidExample(props: { story: string }): JSX.Element | JSX.FunctionElement {
  const Example = loaders[props.story as keyof typeof loaders]
  return Example ? h(Example, null) : null
}
