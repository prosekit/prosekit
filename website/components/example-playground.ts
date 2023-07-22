import { defineComponent, h } from 'vue'

import { stories } from './example-glob-import.gen'
import { Playground } from './playground'

export interface ExamplePlaygroundProps {
  collection: string
  story: string
  expand?: boolean
}

export const ExamplePlayground = defineComponent<ExamplePlaygroundProps>(
  (props) => {
    const { collection, story, expand } = props
    const key = collection + '/' + story
    const files = stories[key as keyof typeof stories]

    if (!files) {
      throw new Error(`Failed to find story files by key ${key}`)
    }

    return () => h(Playground, { files, expand })
  },
  {
    props: ['collection', 'story', 'expand'],
  },
)
