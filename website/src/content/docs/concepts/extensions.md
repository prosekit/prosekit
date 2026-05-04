---
title: Extensions
description: How extensions compose, the spec/commands/keymap split, and when to use withPriority
sidebar:
  order: 30
---

Every feature in ProseKit ships as an **extension**. Extensions are small, plain values you compose with [`union(...)`](/references/core#union) and pass to [`createEditor`](/references/core#createeditor).

## The basic shape

```ts twoslash
import { createEditor, union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

const extension = union(
  defineDoc(),
  defineText(),
  defineParagraph(),
)

const editor = createEditor({ extension })
```

## Per-feature `define*` factories

Each feature in `prosekit/extensions/<name>` exposes a single high-level factory that bundles every related piece (schema, commands, keymap, input rules) into one extension. Examples: [`defineBold()`](/references/extensions/bold#definebold), [`defineHeading()`](/references/extensions/heading#defineheading), [`defineCodeBlock()`](/references/extensions/code-block#definecodeblock). Use these as your building blocks; if you need to customize a feature beyond what its options expose, drop down to a custom extension instead. See [Custom Extensions](/guides/custom-extensions).

## `defineBasicExtension`

[`defineBasicExtension`](/references/basic#definebasicextension) is a ready-made bundle that's identical to:

```ts twoslash
import { defineBaseCommands, defineBaseKeymap, defineHistory, union } from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'
import { defineBold } from 'prosekit/extensions/bold'
import { defineCode } from 'prosekit/extensions/code'
import { defineCodeBlock } from 'prosekit/extensions/code-block'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineGapCursor } from 'prosekit/extensions/gap-cursor'
import { defineHardBreak } from 'prosekit/extensions/hard-break'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineImage } from 'prosekit/extensions/image'
import { defineItalic } from 'prosekit/extensions/italic'
import { defineLink } from 'prosekit/extensions/link'
import { defineList } from 'prosekit/extensions/list'
import { defineModClickPrevention } from 'prosekit/extensions/mod-click-prevention'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineStrike } from 'prosekit/extensions/strike'
import { defineTable } from 'prosekit/extensions/table'
import { defineText } from 'prosekit/extensions/text'
import { defineUnderline } from 'prosekit/extensions/underline'
import { defineVirtualSelection } from 'prosekit/extensions/virtual-selection'

function defineBasicExtension() {
  return union(
    // Nodes
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHeading(),
    defineList(),
    defineBlockquote(),
    defineImage(),
    defineHorizontalRule(),
    defineHardBreak(),
    defineTable(),
    defineCodeBlock(),
    // Marks
    defineItalic(),
    defineBold(),
    defineUnderline(),
    defineStrike(),
    defineCode(),
    defineLink(),
    // Others
    defineBaseKeymap(),
    defineBaseCommands(),
    defineHistory(),
    defineGapCursor(),
    defineVirtualSelection(),
    defineModClickPrevention(),
  )
}
```

Copy and tweak that body if you need a smaller set than `defineBasicExtension` provides.

## Extending an existing bundle

You can `union` a bundle with extra extensions to add features:

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'

const extension = union(
  defineBasicExtension(),
  defineCodeBlockShiki(),
)

const editor = createEditor({ extension })
```

## Priority

[`Priority`](/references/core#priority) is a 5-level enum that controls the order in which conflicting contributions resolve.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { Priority, union, withPriority } from 'prosekit/core'
import { defineKeymap } from 'prosekit/core'

const myKeymap = defineKeymap({
  'Mod-b': () => {
    console.log('Custom bold behavior')
    return true
  },
})

const extension = union(
  defineBasicExtension(),
  withPriority(myKeymap, Priority.high),
)
```

Use `Priority.default` (the default) unless you have a specific reason. `withPriority` returns a new extension; the original is left alone.

## Defining your own extension

For one-off behavior, the easiest entry points are [`defineKeymap`](/references/core#definekeymap), [`defineCommands`](/references/core#definecommands), and the per-event hooks like [`defineKeyDownHandler`](/references/core#definekeydownhandler). For a full custom node or mark, see [Custom Extensions](/guides/custom-extensions).

## See also

- [Schema](/concepts/schema): defining your own nodes and marks.
- [Commands](/concepts/commands): running commands and binding keys.
- [`prosekit/core` reference](/references/core)
- [`prosekit/extensions` reference](/references/extensions)
