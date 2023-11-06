# Code

The `code` mark is used to represent text that is computer code. It will be rendered as `<code>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-code/App.vue'
</script>

:::tabs key:framework
== Preview

<div class="p-2"><App/></div>
== Vue
<ExamplePlaygroundLazy example="vue-code" />
:::

## Commands

### `toggleCode`

```ts
editor.commands.toggleCode()
```

## Keyboard Shortcuts

| Shortcut | Description                          |
| -------- | ------------------------------------ |
| `Mod-E`  | Toggle the current selection to code |
