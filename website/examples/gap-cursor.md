<!-- This file is generated by gen-example-previews.ts -->

<script setup>
import { ExamplePreview } from '@/.vitepress/components/example-preview'
import { FrameworkCodeBlock } from '@/.vitepress/components/framework-code-block'
import { useRoute } from 'vitepress'
const { path } = useRoute()
</script>

<ExamplePreview :defaultShowCode="path.startsWith('/examples/')" name="gap-cursor" >

<template v-slot:react>

::: code-group

<<< @/../playground/src/examples/react/gap-cursor/editor.tsx
<<< @/../playground/src/examples/react/gap-cursor/extension.ts

:::

</template>

</ExamplePreview>
