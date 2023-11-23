# Code

The `code` mark is used to represent a short fragment of computer code. It will be rendered as `<code>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-code/editor.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><App/></ClientOnly>
== Vue
<ExamplePlaygroundLazy example="vue-code" />
:::

## Commands

### `toggleCode`

```ts
editor.commands.toggleCode()
```

## Keyboard Shortcuts

| Non-Apple | Apple       | Description                          |
| --------- | ----------- | ------------------------------------ |
| `Ctrl-E`  | `Command-E` | Toggle the current selection to code |
