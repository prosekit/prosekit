<!-- This file is generated by gen-example-previews.ts -->

<script setup>
import { ExamplePreview } from '@/.vitepress/components/example-preview'
import { FrameworkCodeBlock } from '@/.vitepress/components/framework-code-block'
import { useRoute } from 'vitepress'
const { path } = useRoute()
</script>

<ExamplePreview :defaultShowCode="path.startsWith('/examples/')" name="italic" >

<template v-slot:vue>

::: code-group

<<< @/../playground/examples/vue/italic/editor.vue
<<< @/../playground/examples/vue/italic/extension.ts
<<< @/../playground/examples/vue/italic/toolbar.vue
<<< @/../playground/examples/vue/italic/button.vue

:::

</template>

<template v-slot:svelte>

::: code-group

<<< @/../playground/examples/svelte/italic/editor.svelte
<<< @/../playground/examples/svelte/italic/extension.ts
<<< @/../playground/examples/svelte/italic/toolbar.svelte
<<< @/../playground/examples/svelte/italic/button.svelte

:::

</template>

</ExamplePreview>
