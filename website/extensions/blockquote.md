# Blockquote

The `Blockquote` node represents a block of quoted text. It can be used to create a block of text that is quoted from another source.

<!-- @include: @/examples/blockquote.md -->

## Usage

```ts twoslash
import { defineBlockquote } from 'prosekit/extensions/blockquote'

const extension = defineBlockquote()
```

## Commands

### `setBlockquote`

Set the selected node to a `setBlockquote` node.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'

const extension = defineBlockquote()
const editor = createEditor({ extension })

// ---cut---
editor.commands.setBlockquote()
```

### `insertBlockquote`

Insert a new `blockquote` node.

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'

const extension = defineBlockquote()
const editor = createEditor({ extension })

// ---cut---
editor.commands.insertBlockquote()
```

### `toggleBlockquote`

Toggle the selected node between a `blockquote` node and a default node (e.g. a `paragraph` node).

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'

const extension = defineBlockquote()
const editor = createEditor({ extension })

// ---cut---
editor.commands.toggleBlockquote()
```

## Keyboard Interaction

Input `>` followed by a space, it will automatically convert to a `blockquote` node.

## Keyboard Shortcuts

| Non-Apple      | Apple             | Description       |
| -------------- | ----------------- | ----------------- |
| `Ctrl-Shift-B` | `Command-Shift-B` | Toggle blockquote |
