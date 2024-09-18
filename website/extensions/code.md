# Code

The `code` mark is used to represent a short fragment of computer code. It will be rendered as `<code>` element in HTML.

<!-- @include: @/examples/code.md -->

## Commands

### `toggleCode`

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineCode } from 'prosekit/extensions/code'

const extension = defineCode()
const editor = createEditor({ extension })
// ---cut---
editor.commands.toggleCode()
```

## Keyboard Shortcuts

| Non-Apple | Apple       | Description                          |
| --------- | ----------- | ------------------------------------ |
| `Ctrl-E`  | `Command-E` | Toggle the current selection to code |

## API Reference

- [prosekit/extensions/code](/references/extensions/code)