import type { NodeJSON } from 'prosekit/core'
import {
  defineComponent,
  h,
} from 'vue'

import { loaders } from './loaders.gen'

interface ExampleProps {
  initialContent?: NodeJSON
}

export const VueRenderer = defineComponent(
  ({ story, props }: { story: string; props?: ExampleProps }) => {
    const Example = loaders[story as keyof typeof loaders]
    if (!Example) {
      console.warn(`[VueRenderer] No example found for story ${story}`)
    }
    return () => (Example ? h(Example, props) : h('div'))
  },
  { name: 'VueRenderer', props: ['story', 'props'] },
)
