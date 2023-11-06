# Underline

The `underline` mark is used to represent text with a underline. It will be rendered as `<u>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-underline/App.vue'
</script>

:::tabs key:framework
== Preview

<div class="p-2"><App/></div>
== Vue
<ExamplePlaygroundLazy example="vue-underline" />
:::

## Commands

### `toggleUnderline`

```ts
editor.commands.toggleUnderline()
```

## Keyboard Shortcuts

| Shortcut | Description                               |
| -------- | ----------------------------------------- |
| `Mod-U`  | Toggle the current selection to underline |
