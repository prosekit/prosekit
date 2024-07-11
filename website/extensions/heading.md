# Heading

The `heading` node is used to represent blocks of heading in the document.

<!-- @include: @/examples/heading.md -->

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

| Non-Apple   | Apple       | Description                                                                 |
| ----------- | ----------- | --------------------------------------------------------------------------- |
| `Ctrl-1`    | `Command-1` | Set the current block to an H1 node                                         |
| `Ctrl-2`    | `Command-2` | Set the current block to an H2 node                                         |
| `Ctrl-3`    | `Command-3` | Set the current block to an H3 node                                         |
| `Ctrl-4`    | `Command-4` | Set the current block to an H4 node                                         |
| `Ctrl-5`    | `Command-5` | Set the current block to an H5 node                                         |
| `Ctrl-6`    | `Command-6` | Set the current block to an H6 node                                         |
| `Backspace` | `Backspace` | When the text cursor is at the start of a heading node, set it to paragraph |

## Input Rules

Input `#` followed by a space, it will automatically convert to a `heading` node. One `#` corresponds to an H1 node, two `#` correspond to an H2 node, and so on.

## API Reference

- [prosekit/extensions/heading](/references/extensions/heading)
