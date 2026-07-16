---
title: Testing your editor
description: Use prosekit/core/test to run editor commands in unit tests with builder syntax for documents
sidebar:
  order: 110
---

`prosekit/core/test` provides a small layer for unit-testing extensions and editors without spinning up a browser.

## `createTestEditor`

`createTestEditor(options)` is a drop-in alternative to `createEditor` that returns a `TestEditor`. It exposes the same API as `Editor`, plus helpers for setting the document and selection from a builder syntax.

```ts twoslash
import { union } from 'prosekit/core'
import { createTestEditor } from 'prosekit/core/test'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

const editor = createTestEditor({
  extension: union(defineDoc(), defineText(), defineParagraph()),
})
```

You don't call `editor.mount(...)`. The test editor manages a detached view internally.

## Using the builder syntax

`editor.nodes.<name>(...)` and `editor.marks.<name>(...)` are typed factories generated from your schema. Use them to build a document and hand it to `editor.set(...)`.

```ts twoslash
import { union } from 'prosekit/core'
import { createTestEditor } from 'prosekit/core/test'
import { defineBold } from 'prosekit/extensions/bold'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

const editor = createTestEditor({
  extension: union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBold(),
  ),
})

const n = editor.nodes
const m = editor.marks
const doc = n.doc(
  n.paragraph('Hello, ', m.bold('world'), '!'),
)
editor.set(doc)
```

## Building documents without an editor

When you only need to build a document and not run commands, you can skip the editor entirely. `createNodeBuilders(schema)` and `createMarkBuilders(schema)` return the same typed factories as `editor.nodes` / `editor.marks`, but they take a schema directly and omit `isActive`. Pass your extension type as the type argument to type them to your schema.

```ts twoslash
import { createMarkBuilders, createNodeBuilders, union } from 'prosekit/core'
import { defineBold } from 'prosekit/extensions/bold'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

function defineTestExtension() {
  return union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHeading(),
    defineBold(),
  )
}

type TestExtension = ReturnType<typeof defineTestExtension>
const extension: TestExtension = defineTestExtension()
const schema = extension.schema!

const n = createNodeBuilders<TestExtension>(schema)
const m = createMarkBuilders<TestExtension>(schema)

const doc = n.doc(
  n.heading({ level: 1 }, 'Title'),
  n.paragraph('Hello, ', m.bold('world'), '!'),
)
```

## Selection markers

The `set` helper recognizes two special tokens in text content:

- `<a>` marks the start of the selection.
- `<b>` marks the end of the selection.

```ts twoslash
import { union } from 'prosekit/core'
import { createTestEditor } from 'prosekit/core/test'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

const editor = createTestEditor({
  extension: union(defineDoc(), defineText(), defineParagraph()),
})

const n = editor.nodes
const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
editor.set(doc)
// "Hello" is now selected.
```

## Reading a selection back with `extractSelection`

`extractSelection(doc)` reads the `<a>`/`<b>` tokens out of a tagged document and returns the matching [`Selection`](https://prosemirror.net/docs/ref/#state.Selection). Use it in tests to assert against an expected tagged document instead of hand-counting positions.

```ts twoslash
import { union } from 'prosekit/core'
import { createTestEditor, extractSelection } from 'prosekit/core/test'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'
import { expect, it } from 'vitest'

const editor = createTestEditor({
  extension: union(defineDoc(), defineText(), defineParagraph()),
})

const n = editor.nodes

it('preserves the selection that <a> and <b> describe', () => {
  const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
  editor.set(doc)

  expect(editor.state.selection.toJSON()).toEqual(
    extractSelection(doc)?.toJSON(),
  )
})
```

## A complete unit test

```ts twoslash
import { union } from 'prosekit/core'
import { createTestEditor } from 'prosekit/core/test'
import { defineBold } from 'prosekit/extensions/bold'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'
import { describe, expect, it } from 'vitest'

describe('toggleBold', () => {
  it('wraps the selection in a bold mark', () => {
    const editor = createTestEditor({
      extension: union(
        defineDoc(),
        defineText(),
        defineParagraph(),
        defineBold(),
      ),
    })

    const n = editor.nodes
    editor.set(n.doc(n.paragraph('<a>hi<b>')))

    expect(editor.commands.toggleBold.canExec()).toBe(true)
    editor.commands.toggleBold()
    expect(editor.marks.bold.isActive()).toBe(true)
  })
})
```

## See also

- [Concepts → The Editor](/concepts/editor)
- [`prosekit/core/test` reference](/references/core/test)
