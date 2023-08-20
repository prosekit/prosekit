import { defineComponent, h } from 'vue'

import { examples } from './example-glob-import.gen'
import { Playground } from './playground'

export interface ExamplePlaygroundProps {
  example: string
  expand?: boolean
}

export const ExamplePlayground = defineComponent<ExamplePlaygroundProps>(
  (props) => {
    const { example, expand } = props
    const files = examples[example as keyof typeof examples]

    if (!files) {
      throw new Error(`Failed to find story files by key ${example}`)
    }

    return () => h(Playground, { files, expand, name: example })
  },
  {
    props: ['example', 'expand'],
  },
)
