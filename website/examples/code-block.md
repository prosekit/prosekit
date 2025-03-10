<!-- This file is generated by gen-example-previews.ts -->

<script setup>
import { ExamplePreview } from '@/.vitepress/components/example-preview'
import { FrameworkCodeBlock } from '@/.vitepress/components/framework-code-block'
import { useRoute } from 'vitepress'
const { path } = useRoute()
</script>

<ExamplePreview :defaultShowCode="path.startsWith('/examples/')" name="code-block" >

<template v-slot:react>

::: code-group

<<< @/../playground/src/examples/react/code-block/editor.tsx
<<< @/../playground/src/examples/react/code-block/extension.ts
<<< @/../playground/src/examples/react/code-block/toolbar.tsx
<<< @/../playground/src/examples/react/code-block/code-block-view.tsx
<<< @/../playground/src/examples/react/code-block/default-doc.ts
<<< @/../playground/src/examples/react/code-block/button.tsx

:::

</template>

<template v-slot:vue>

::: code-group

<<< @/../playground/src/examples/vue/code-block/editor.vue
<<< @/../playground/src/examples/vue/code-block/extension.ts
<<< @/../playground/src/examples/vue/code-block/toolbar.vue
<<< @/../playground/src/examples/vue/code-block/code-block-view.vue
<<< @/../playground/src/examples/vue/code-block/default-doc.ts
<<< @/../playground/src/examples/vue/code-block/button.vue

:::

</template>

<template v-slot:svelte>

::: code-group

<<< @/../playground/src/examples/svelte/code-block/editor.svelte
<<< @/../playground/src/examples/svelte/code-block/extension.ts
<<< @/../playground/src/examples/svelte/code-block/toolbar.svelte
<<< @/../playground/src/examples/svelte/code-block/code-block-view.svelte
<<< @/../playground/src/examples/svelte/code-block/default-doc.ts
<<< @/../playground/src/examples/svelte/code-block/emoji.ts
<<< @/../playground/src/examples/svelte/code-block/button.svelte

:::

</template>

<template v-slot:solid>

::: code-group

<<< @/../playground/src/examples/solid/code-block/editor.tsx
<<< @/../playground/src/examples/solid/code-block/extension.ts
<<< @/../playground/src/examples/solid/code-block/toolbar.tsx
<<< @/../playground/src/examples/solid/code-block/code-block-view.tsx
<<< @/../playground/src/examples/solid/code-block/default-doc.ts
<<< @/../playground/src/examples/solid/code-block/button.tsx

:::

</template>

</ExamplePreview>
