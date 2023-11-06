# Strike

The `strike` mark is used to represent text with a strikethrough. It will be rendered as `<s>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-strike/App.vue'
</script>

:::tabs key:framework
== Preview

<div class="p-2"><App/></div>
== Vue
<ExamplePlaygroundLazy example="vue-strike" />
:::

## Commands

### `toggleStrike`

```ts
editor.commands.toggleStrike()
```

## Keyboard Shortcuts

| Shortcut      | Description                            |
| ------------- | -------------------------------------- |
| `Mod-Shift-X` | Toggle the current selection to strike |
| `Mod-Shift-S` | Toggle the current selection to strike |
