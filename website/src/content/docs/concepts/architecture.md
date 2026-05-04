---
title: Architecture
description: How extensions, the editor, and the schema/commands/views fit together
sidebar:
  order: 10
---

`prosekit/core` is a small, type-safe layer on top of [ProseMirror](https://prosemirror.net/). This page shows how every editor is put together.

## The mental model

You combine **extensions** with `union(...)` and pass the result to `createEditor({ extension })`. You get back an `Editor` whose `commands`, `nodes`, `marks`, and `view` are typed from the extensions you passed in.

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

## What an extension is

An extension is an object that holds part of the editor: a schema, commands, keymaps, plugins, or any mix of these. You never build one by hand. You call a `define*` function, and you combine extensions with `union(...)`. The functions come at different levels of abstraction. Here are three examples:

- [`defineNodeSpec()`](/references/core#definenodespec) wraps a single ProseMirror node spec and adds nothing else.
- [`defineHeading()`](/references/extensions/heading#defineheading) bundles the `heading` node spec with its commands, keymaps, and input rules, so one call gives you the full heading feature.
- [`defineBasicExtension()`](/references/basic#definebasicextension) is a pre-bundled set of extensions that gives you a working editor out of the box including paragraphs, headings, lists, code blocks, and more.

Pick the level that fits your need. Most app code starts with `defineBasicExtension()` and adds individual feature extensions.

## Where to go next

- [The Editor](/concepts/editor): what the `Editor` instance exposes.
- [Extensions](/concepts/extensions): how to compose them.
- [Schema](/concepts/schema): nodes and marks.
- [Commands](/concepts/commands): how to run and check commands.
- [Content](/concepts/content): convert between JSON, HTML, and ProseMirror nodes.
- [Views](/concepts/views): node views, mark views, decorations.
