import {
  defineComponent,
  h,
} from 'vue'

import { loaders } from './loaders.gen'

export const VueRenderer = defineComponent(
  ({ story }: { story: string }) => {
    const Example = loaders[story as keyof typeof loaders]
    if (!Example) {
      console.warn(`[VueRenderer] No example found for story ${story}`)
    }
    return () => (Example ? h(Example) : h('div'))
  },
  { name: 'VueRenderer', props: ['story'] },
)
