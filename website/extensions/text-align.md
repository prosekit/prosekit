# Text Align

Sets the horizontal alignment of the block nodes using the [`text-align`] CSS property.

## Usage

```ts twoslash
import { defineTextAlign } from 'prosekit/extensions/text-align'

const extension = defineTextAlign({
  // A list of nodes that will be applied.
  types: ['paragraph', 'heading'],
  // An optional default alignment value. Defaults to `left`.
  default: 'center',
})
```

## Commands

### `setTextAlign`

Apply an alignment value to selected blocks.

```ts
import { createEditor } from 'prosekit/core'
import { defineTextAlign } from 'prosekit/extensions/text-align'

const extension = defineTextAlign(types: ['paragraph', 'heading'])
const editor = createEditor({ extension })

// ---cut---
editor.commands.setTextAlign('right')
```

## Keyboard Shortcuts

| Non-Apple      | Apple             | Description  |
| -------------- | ----------------- | ------------ |
| `Ctrl-Shift-L` | `Command-Shift-L` | Left align   |
| `Ctrl-Shift-E` | `Command-Shift-E` | Center align |
| `Ctrl-Shift-R` | `Command-Shift-R` | Right align  |
| `Ctrl-Shift-J` | `Command-Shift-J` | Justified    |

## API Reference

- [prosekit/extensions/text-align](/references/extensions/text-align)

<!-- Link references -->

[`text-align`]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
