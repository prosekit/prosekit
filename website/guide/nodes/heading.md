# Heading

The `heading` node is used to represent blocks of code in the document.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-heading/App.vue'
</script>

:::tabs key:framework

== Preview

<div class="p-2"><App/></div>
== React
<ExamplePlaygroundLazy example="react-heading" />
== Vue
<ExamplePlaygroundLazy example="vue-heading" />
== Solid
<ExamplePlaygroundLazy example="solid-heading" />
:::

## Usage

```ts
import { defineHeading } from 'prosekit/extensions/heading'

const extension = defineHeading()
```

## Commands

### `setHeading`

```ts
editor.commands.setHeading({ level: 1 })
```

### `toggleHeading`

```ts
editor.commands.toggleHeading({ level: 1 })
```

### `insertHeading`

```ts
editor.commands.insertHeading({ level: 1 })
```

## Keyboard Shortcuts

| Shortcut | Description                         |
| -------- | ----------------------------------- |
| `Mod-1`  | Set the current block to an H1 node |
| `Mod-2`  | Set the current block to an H2 node |
| `Mod-3`  | Set the current block to an H3 node |
| `Mod-4`  | Set the current block to an H4 node |
| `Mod-5`  | Set the current block to an H5 node |
| `Mod-6`  | Set the current block to an H6 node |

## Input Rules

Input `#` followed by a space, it will automatically convert to a `heading` node. One `#` corresponds to an H1 node, two `#` correspond to an H2 node, and so on.

## API Reference

- [prosekit/extensions/heading](/references/extensions/heading)
