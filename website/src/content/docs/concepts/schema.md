---
title: Schema
description: Nodes, marks, content expressions, and how attribute typing flows through extensions
sidebar:
  order: 40
---

A ProseMirror **schema** describes the shape of valid documents. In ProseKit you don't construct it directly. Every extension contributes its piece, and the editor merges them.

## Nodes vs. marks

A document is a tree of **nodes**. Block nodes (paragraphs, headings, lists) hold other nodes; inline nodes (text, images, hard breaks) live inside blocks. **Marks** are inline annotations on text: bold, italic, links, code.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
// ---cut---
// Inspect the schema produced by your extensions:
const nodeNames = Object.keys(editor.schema.nodes)
const markNames = Object.keys(editor.schema.marks)
```

## Defining a node

Use [`defineNodeSpec`](/references/core#definenodespec) to add a node type. The `name`, `content`, `group`, `parseDOM`, and `toDOM` fields follow ProseMirror conventions exactly. ProseKit just adds typed attribute support.

```ts twoslash
import { defineNodeSpec } from 'prosekit/core'

const fancyParagraph = defineNodeSpec({
  name: 'fancyParagraph',
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p.fancy' }],
  toDOM() {
    return ['p', { class: 'fancy' }, 0]
  },
})
```

`content` is a [content expression](https://prosemirror.net/docs/guide/#schema.content_expressions):

- `"inline*"`: zero or more inline nodes
- `"block+"`: one or more block nodes
- `"text*"`: zero or more text nodes

## Defining a mark

[`defineMarkSpec`](/references/core#definemarkspec) is the mark equivalent. You can borrow the existing extensions for examples. The [Bold](/extensions/bold) page links to the source of `defineBoldSpec`.

```ts twoslash
import { defineMarkSpec } from 'prosekit/core'

const highlight = defineMarkSpec({
  name: 'highlight',
  parseDOM: [{ tag: 'mark' }],
  toDOM() {
    return ['mark', 0]
  },
})
```

## Adding attributes to existing nodes/marks

[`defineNodeAttr`](/references/core#definenodeattr) and [`defineMarkAttr`](/references/core#definemarkattr) extend an existing type without redefining it. Useful for adding optional metadata (e.g., an `id` on every paragraph) that another extension is the source of truth for.

```ts twoslash
import { defineNodeAttr } from 'prosekit/core'

const paragraphId = defineNodeAttr({
  type: 'paragraph',
  attr: 'id',
  default: null,
  parseDOM: (node) => node.getAttribute('id'),
  toDOM: (value) => value ? ['id', String(value)] : null,
})
```

## Type inference

ProseKit threads the union of every node, mark, and command through the TypeScript type system. The `Editor` instance ends up with `nodes`, `marks`, and `commands` keyed by exactly what you registered.

```ts twoslash
import { createEditor, union } from 'prosekit/core'
import { defineBold } from 'prosekit/extensions/bold'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

const extension = union(
  defineDoc(),
  defineText(),
  defineParagraph(),
  defineBold(),
)

const editor = createEditor({ extension })

editor.marks.bold.isActive()
editor.commands.toggleBold()
// editor.commands.toggleItalic() // TS error: italic was not registered
```

## See also

- [Extensions](/concepts/extensions)
- [Views](/concepts/views): how nodes/marks render to the DOM.
- [`prosekit/core` reference](/references/core)
- ProseMirror's own [schema guide](https://prosemirror.net/docs/guide/#schema) is still the best reference for content expressions and parse rules.
