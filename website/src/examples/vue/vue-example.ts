import {
  defineComponent,
  h,
} from 'vue'

import { loaders } from './loaders.gen'

export const VueExample = defineComponent(
  ({ story }: { story: string }) => {
    const Example = loaders[story as keyof typeof loaders]
    return () => (Example ? h(Example) : h('div'))
  },
  { name: 'VueExample', props: ['story'] },
)
