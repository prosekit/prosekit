# Strike

The `strike` mark is used to represent text with a strikethrough. It will be rendered as `<s>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-strike/App.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><div class="p-2"><App/></div></ClientOnly>
== Vue
<ExamplePlaygroundLazy example="vue-strike" />
:::

## Commands

### `toggleStrike`

```ts
editor.commands.toggleStrike()
```

## Keyboard Shortcuts

| Non-Apple                      | Apple                                | Description                            |
| ------------------------------ | ------------------------------------ | -------------------------------------- |
| `Ctrl-Shift-X`, `Ctrl-Shift-S` | `Command-Shift-X`, `Command-Shift-S` | Toggle the current selection to strike |
