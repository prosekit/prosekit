<!-- This file is generated by gen-example-previews.ts -->

<script setup>
import { ExamplePreview } from '@/.vitepress/components/example-preview'
import { FrameworkCodeBlock } from '@/.vitepress/components/framework-code-block'
import { useRoute } from 'vitepress'
const { path } = useRoute()
</script>

<ExamplePreview :defaultShowCode="path.startsWith('/examples/')" name="block-handle" >

<template v-slot:react>

::: code-group

<<< @/../playground/src/examples/react/block-handle/editor.tsx
<<< @/../playground/src/examples/react/block-handle/extension.ts
<<< @/../playground/src/examples/react/block-handle/block-handle.tsx

:::

</template>

<template v-slot:vue>

::: code-group

<<< @/../playground/src/examples/vue/block-handle/editor.vue
<<< @/../playground/src/examples/vue/block-handle/extension.ts
<<< @/../playground/src/examples/vue/block-handle/block-handle.vue

:::

</template>

</ExamplePreview>
