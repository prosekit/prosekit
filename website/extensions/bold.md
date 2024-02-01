# Bold

The `bold` mark is used to represent text that is using a bold font weight. It will be rendered as `<strong>` element in HTML.

<!-- @include: @/examples/bold.md -->

## Commands

### `toggleBold`

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineBold } from 'prosekit/extensions/bold'

const extension = defineBold()
const editor = createEditor({ extension })

// ---cut---
editor.commands.toggleBold()
```

## Keyboard Shortcuts

| Non-Apple | Apple       | Description                          |
| --------- | ----------- | ------------------------------------ |
| `Ctrl-B`  | `Command-B` | Toggle the current selection to bold |

## API Reference

- [prosekit/extensions/bold](/references/extensions/bold)
