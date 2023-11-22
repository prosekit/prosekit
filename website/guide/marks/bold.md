# Bold

The `bold` mark is used to represent text that is using a bold font weight. It will be rendered as `<strong>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-bold/app.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><div class="p-2"><App/></div></ClientOnly>
== Vue
<ExamplePlaygroundLazy example="vue-bold" />
== Svelte
<ExamplePlaygroundLazy example="svelte-bold" />
:::

## Commands

### `toggleBold`

```ts
editor.commands.toggleBold()
```

## Keyboard Shortcuts

| Non-Apple | Apple       | Description                          |
| --------- | ----------- | ------------------------------------ |
| `Ctrl-B`  | `Command-B` | Toggle the current selection to bold |
