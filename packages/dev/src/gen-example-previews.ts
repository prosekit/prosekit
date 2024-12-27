import { groupBy } from 'lodash-es'

import {
  readExampleMeta,
  type Example,
} from './example-meta.js'
import { vfs } from './virtual-file-system.js'

export async function genExamplePreviews() {
  const meta = await readExampleMeta()
  const stories = groupBy(meta.examples, (example) => {
    return example.story
  })

  await vfs.cleanFilesInDir('website/examples')

  for (const [story, examples] of Object.entries(stories)) {
    if (!story) continue

    await vfs.updateText(
      `website/examples/${story}.md`,
      formatPreview(story, examples),
    )
  }
}

function formatPreview(story: string, examples: Example[]) {
  return (
    `
<!-- This file is generated by gen-example-previews.ts -->

<script setup>
import { ExamplePreview } from '@/.vitepress/components/example-preview'
import { FrameworkCodeBlock } from '@/.vitepress/components/framework-code-block'
import { useRoute } from 'vitepress'
const { path } = useRoute()
</script>

<ExamplePreview :defaultShowCode="path.startsWith('/examples/')" name="${story}" >

${examples.map(formatExample).join('\n\n')}

</ExamplePreview>
    `.trim() + '\n'
  )
}

function formatExample(example: Example) {
  const imports = example.files
    .map((file) => {
      if (file.hidden) {
        return ''
      }
      return `<<< @/../playground/examples/${example.framework}/${example.story}/${file.path}`
    })
    .filter(Boolean)
    .join('\n')

  return `
<template v-slot:${example.framework}>

::: code-group

${imports}

:::

</template>  
    `.trim()
}
