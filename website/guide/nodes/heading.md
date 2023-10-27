# Heading

The `heading` node is used to represent blocks of code in the document.

## Usage

To add a `heading` node to your document, you can use the `defineHeading` function.

```ts
import { union } from 'prosekit/core'
import { defineHeading } from 'prosekit/extensions/heading'

function defineEditorExtension() {
  return union([
    defineHeading(),
    // ... other extensions
  ])
}
```

## Input Rules

After typing `#` followed by a space, it will automatically convert to a `heading` node. One `#` corresponds to an H1 node, two `#` correspond to an H2 node, and so on.

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

| Shortcut                           | Description                         |
| ---------------------------------- | ----------------------------------- |
| `Ctrl-1` (or `Command-1` on macOS) | Set the current block to an H1 node |
| `Ctrl-2` (or `Command-2` on macOS) | Set the current block to an H2 node |
| `Ctrl-3` (or `Command-3` on macOS) | Set the current block to an H3 node |
| `Ctrl-4` (or `Command-4` on macOS) | Set the current block to an H4 node |
| `Ctrl-5` (or `Command-5` on macOS) | Set the current block to an H5 node |
| `Ctrl-6` (or `Command-6` on macOS) | Set the current block to an H6 node |

## Example

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
</script>

:::tabs key:framework
== React
<ExamplePlaygroundLazy example="react-heading" />
== Vue
<ExamplePlaygroundLazy example="vue-heading" />
== Solid
<ExamplePlaygroundLazy example="solid-heading" />
:::

## API Reference

See the documentation below for a complete reference to the extensions mentioned here.

- [prosekit/extensions/heading](/references/extensions/heading)
