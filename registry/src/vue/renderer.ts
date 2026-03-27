import type { NodeJSON } from 'prosekit/core'
import { defineComponent, h } from 'vue'

import { loaders } from './loaders.gen'

interface ExampleProps {
  initialContent?: NodeJSON
}

interface Props {
  story: string
  exampleProps?: ExampleProps
}

export const VueRenderer = defineComponent(
  (props: Props) => {
    const Example = loaders[props.story as keyof typeof loaders]
    if (!Example) {
      console.warn(`[VueRenderer] No example found for story ${props.story}`)
    }
    return () => (Example ? h(Example, props.exampleProps ?? null) : h('div'))
  },
  { name: 'VueRenderer', props: ['story', 'exampleProps'] },
)
