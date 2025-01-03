<!-- This file is generated by gen-example-previews.ts -->

<script setup>
import { ExamplePreview } from '@/.vitepress/components/example-preview'
import { FrameworkCodeBlock } from '@/.vitepress/components/framework-code-block'
import { useRoute } from 'vitepress'
const { path } = useRoute()
</script>

<ExamplePreview :defaultShowCode="path.startsWith('/examples/')" name="readonly" >

<template v-slot:react>

::: code-group

<<< @/../playground/examples/react/readonly/editor.tsx
<<< @/../playground/examples/react/readonly/extension.ts
<<< @/../playground/examples/react/readonly/toolbar.tsx
<<< @/../playground/examples/react/readonly/use-readonly.ts
<<< @/../playground/examples/react/readonly/button.tsx

:::

</template>

<template v-slot:vue>

::: code-group

<<< @/../playground/examples/vue/readonly/editor.vue
<<< @/../playground/examples/vue/readonly/extension.ts
<<< @/../playground/examples/vue/readonly/toolbar.vue
<<< @/../playground/examples/vue/readonly/use-readonly.ts
<<< @/../playground/examples/vue/readonly/button.vue

:::

</template>

<template v-slot:preact>

::: code-group

<<< @/../playground/examples/preact/readonly/editor.tsx
<<< @/../playground/examples/preact/readonly/extension.ts
<<< @/../playground/examples/preact/readonly/toolbar.tsx
<<< @/../playground/examples/preact/readonly/use-readonly.ts
<<< @/../playground/examples/preact/readonly/button.tsx

:::

</template>

<template v-slot:svelte>

::: code-group

<<< @/../playground/examples/svelte/readonly/editor.svelte
<<< @/../playground/examples/svelte/readonly/extension.ts
<<< @/../playground/examples/svelte/readonly/toolbar.svelte
<<< @/../playground/examples/svelte/readonly/use-readonly.ts
<<< @/../playground/examples/svelte/readonly/button.svelte

:::

</template>

<template v-slot:solid>

::: code-group

<<< @/../playground/examples/solid/readonly/editor.tsx
<<< @/../playground/examples/solid/readonly/extension.ts
<<< @/../playground/examples/solid/readonly/toolbar.tsx
<<< @/../playground/examples/solid/readonly/use-readonly.ts
<<< @/../playground/examples/solid/readonly/button.tsx

:::

</template>

</ExamplePreview>
