# Underline

The `underline` mark is used to represent text with a underline. It will be rendered as `<u>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-underline/editor.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><div class="p-2"><App/></div></ClientOnly>
== Vue
<ExamplePlaygroundLazy example="vue-underline" />
:::

## Commands

### `toggleUnderline`

```ts
editor.commands.toggleUnderline()
```

## Keyboard Shortcuts

| Non-Apple | Apple       | Description                               |
| --------- | ----------- | ----------------------------------------- |
| `Ctrl-U`  | `Command-U` | Toggle the current selection to underline |
