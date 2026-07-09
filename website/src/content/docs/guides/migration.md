---
title: Migration Guide
description: Map idioms from Tiptap, Remirror, and plain ProseMirror onto their ProseKit equivalents
sidebar:
  order: 200
---

ProseKit wraps [ProseMirror](https://prosemirror.net/) with a composable, typed API. If you're coming from Tiptap, Remirror, or a hand-rolled ProseMirror setup, most patterns have a direct equivalent. This page collects the ones you'll hit first.

## From Tiptap

| Tiptap                                     | ProseKit                                      |
| ------------------------------------------ | --------------------------------------------- |
| `Extension.create({ ... })`                | `define*` factories + `union(...)`            |
| `useEditor({ extensions, content })`       | `createEditor({ extension, defaultContent })` |
| `editor.chain().toggleBold().run()`        | `editor.commands.toggleBold()`                |
| `editor.can().toggleBold()`                | `editor.commands.toggleBold.canExec()`        |
| `editor.isActive('bold')`                  | `editor.marks.bold.isActive()`                |
| `editor.isActive('heading', { level: 1 })` | `editor.nodes.heading.isActive({ level: 1 })` |
| `editor.commands.setContent(html)`         | `editor.setContent(html)`                     |
| `editor.getHTML()` / `getJSON()`           | `editor.getDocHTML()` / `getDocJSON()`        |
| `Node.create({ name, ... })`               | `defineNodeSpec({ name, ... })`               |
| `Mark.create({ name, ... })`               | `defineMarkSpec({ name, ... })`               |
| `addCommands()`                            | `defineCommands({ ... })`                     |
| `addKeyboardShortcuts()`                   | `defineKeymap({ ... })`                       |
| `addInputRules()`                          | `defineInputRule(...)` (regex-driven)         |

**Tiptap**

```ts
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

const editor = new Editor({
  element: document.querySelector('#editor')!,
  extensions: [StarterKit],
  content: '<p>Hello</p>',
})

editor.commands.toggleBold()
```

**ProseKit**

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'

const editor = createEditor({
  extension: defineBasicExtension(),
  defaultContent: '<p>Hello</p>',
})

const root = document.querySelector('#editor')
if (root) editor.mount(root as HTMLElement)

editor.commands.toggleBold()
```

### Sharp edges

- **There is no `chain()`.** Each command runs as a single transaction. For composite commands, write a function that returns a `Command` and pass it to `editor.exec(...)`.
- **Hooks are framework-specific.** The Tiptap React [`useEditorState`](https://github.com/ueberdosis/tiptap/blob/v3.22.5/packages/react/src/useEditorState.ts) is closest to ProseKit's [`useEditorDerivedValue`](/frameworks/react#useeditorderivedvalue).

## From Remirror

| Remirror                                                    | ProseKit                                               |
| ----------------------------------------------------------- | ------------------------------------------------------ |
| `class FooExtension extends NodeExtension`                  | `defineNodeSpec({ name, ... })`                        |
| `class FooExtension extends MarkExtension`                  | `defineMarkSpec({ name, ... })`                        |
| `class FooExtension extends PlainExtension`                 | a `define*` factory that returns an extension          |
| `new BoldExtension()`, `new ItalicExtension()`              | `defineBold()`, `defineItalic()`                       |
| `[ext1, ext2, ext3]`                                        | `union(ext1, ext2, ext3)`                              |
| `useRemirror({ extensions, content })`                      | `createEditor({ extension, defaultContent })`          |
| `<Remirror manager={manager} state={state} onChange={...}>` | `<ProseKit editor={editor}><div ref={editor.mount} />` |
| `useCommands().toggleBold()`                                | `editor.commands.toggleBold()`                         |
| `useChainedCommands().toggleBold().toggleItalic().run()`    | call commands separately, or write a custom Command    |
| `commands.toggleBold.enabled()`                             | `editor.commands.toggleBold.canExec()`                 |
| `useActive().bold()`                                        | `editor.marks.bold.isActive()`                         |
| `useActive().heading({ level: 1 })`                         | `editor.nodes.heading.isActive({ level: 1 })`          |
| `useHelpers().getHTML()` / `getJSON()`                      | `editor.getDocHTML()` / `editor.getDocJSON()`          |
| `commands.setContent(html)`                                 | `editor.setContent(html)`                              |
| `createKeymap()` (extension method)                         | `defineKeymap({ ... })`                                |
| `createInputRules()` (extension method)                     | `defineInputRule(...)`                                 |
| `OnChangeJSON` / `useEditorEvent('docChanged')`             | `useDocChange(handler)`                                |

**Remirror**

```tsx
import 'remirror/styles/all.css'

import { Remirror, useRemirror } from '@remirror/react'
import { BoldExtension, ItalicExtension, UnderlineExtension } from 'remirror/extensions'

function extensions() {
  return [
    new BoldExtension(),
    new ItalicExtension(),
    new UnderlineExtension(),
  ]
}

export function Editor() {
  const { manager, state } = useRemirror({
    extensions,
    content: '<p>Hello</p>',
    stringHandler: 'html',
  })

  return <Remirror manager={manager} initialContent={state} />
}
```

**ProseKit**

```tsx
'use client'

import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

export function Editor() {
  const editor = useMemo(() => {
    return createEditor({
      extension: defineBasicExtension(),
      defaultContent: '<p>Hello</p>',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} />
    </ProseKit>
  )
}
```

### Sharp edges

- **No extension classes.** Remirror extensions are subclasses of `NodeExtension` / `MarkExtension` / `PlainExtension`, instantiated with `new` and wired through a `manager`. ProseKit extensions are plain values returned from `define*` functions, composed with `union(...)`. Lifecycle methods like `createKeymap()` and `createInputRules()` become standalone `defineKeymap({...})` and `defineInputRule(...)` in the same `union`.
- **No manager / state split.** Remirror gives you `{ manager, state, onChange }` and you wire all three into `<Remirror>`. ProseKit gives you a single `editor` instance you mount into a DOM node via `editor.mount` (a callback ref) inside `<ProseKit editor={editor}>`.
- **No `chain().run()`.** Each `editor.commands.foo()` call runs as its own transaction. To group several edits into one transaction, write a function that returns a ProseMirror `Command` and pass it to `editor.exec(...)`.
- **`active` and `enabled` are methods on the editor, not React hooks.** Read them inline (e.g. `editor.commands.toggleBold.canExec()` or `editor.marks.bold.isActive()`) and pull the booleans out through [`useEditorDerivedValue`](/frameworks/react#useeditorderivedvalue) when you want React to re-render on change.
- **Helpers live on the editor, not in `useHelpers()`.** `editor.getDocHTML()` and `editor.getDocJSON()` replace the Remirror helpers. There's no built-in `getText()`, so read `editor.view.state.doc.textContent` if you need the plain string.
- **Subscribing to changes uses hooks, not components.** Replace `<OnChangeJSON onChange={...}>` with [`useDocChange`](/frameworks/react#usedocchange) (fires on document edits) or [`useStateUpdate`](/frameworks/react#usestateupdate) (fires on every state update, including selection changes).

## From plain ProseMirror

ProseKit is a thin layer over ProseMirror, so your existing schema, plugins, and commands keep working. Most migrations are about _replacing_ ad-hoc setup code with ProseKit primitives, not rewriting your editor from scratch.

### What ProseKit gives you on top of ProseMirror

- **Composition.** `union(define*())` instead of hand-managing `Schema`, `EditorState`, and a plugin array.
- **Typed commands.** `editor.commands.toggleBold()` instead of a loose `dispatch(toggleMark(...))`.
- **Node/mark actions.** `editor.marks.bold.isActive()` and `editor.nodes.heading.isActive({ level: 1 })` without writing selection-walking helpers.
- **Per-event handlers.** `defineKeyDownHandler`, `definePasteHandler`, etc., instead of writing a `Plugin` for each.
- **A consistent extension model.** Every feature (your custom ones included) ships as a `union(...)` of small parts.

### Reusing what you have

#### Existing plugins

Wrap any `Plugin` you already have with [`definePlugin`](/references/core#defineplugin) and union it in:

```ts twoslash
import { definePlugin } from 'prosekit/core'
import { Plugin, PluginKey } from 'prosekit/pm/state'

const myPlugin = definePlugin(
  new Plugin({
    key: new PluginKey('my-plugin'),
    state: {
      init: () => 0,
      apply: (_, value) => value + 1,
    },
  }),
)
```

#### Existing schema specs

`defineNodeSpec` and `defineMarkSpec` accept the exact same options as ProseMirror's `NodeSpec` / `MarkSpec`. If you have a `Schema` factory today, port one type at a time:

```ts twoslash
import { defineNodeSpec } from 'prosekit/core'

const fancyParagraph = defineNodeSpec({
  name: 'fancyParagraph',
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p.fancy' }],
  toDOM: () => ['p', { class: 'fancy' }, 0],
})
```

#### Existing commands

A ProseMirror `Command` is just a `(state, dispatch?, view?) => boolean`. You can pass yours directly to `editor.exec(...)`:

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import type { Command } from 'prosekit/pm/state'

declare const myExistingCommand: Command

const editor = createEditor({ extension: defineBasicExtension() })
editor.exec(myExistingCommand)
```

To expose it as a named action (`editor.commands.myThing()`), wrap it in a `defineCommands`:

```ts twoslash
import { defineCommands } from 'prosekit/core'
import type { Command } from 'prosekit/pm/state'
declare const myExistingCommand: Command

defineCommands({
  myThing: () => myExistingCommand,
})
```

### Re-exports of the underlying packages

`prosekit/pm/*` re-exports the standard ProseMirror packages, so you can drop the direct `prosemirror-state` / `prosemirror-model` dependencies if you want a single import root. The re-exports are type-compatible with the originals, and using both side-by-side works.

### Sharp edges

- **`createEditor` doesn't take a `state` directly.** Pass your initial doc as `defaultContent` (JSON, HTML, or a DOM element).
- **`editor.view` throws until you call `editor.mount(...)`.** Use `editor.mounted` to check before reading view-dependent state, and don't read `view` during construction.
- **Plugins added via `editor.use(...)`** persist until you call the returned dispose function. Don't `use(...)` inside a command. Wire it from your component / setup code instead.

## See also

- [Concepts → Architecture](/concepts/architecture)
- [Concepts → The Editor](/concepts/editor)
- [Concepts → Extensions](/concepts/extensions)
- [Frameworks → React](/frameworks/react)
- [Custom extensions](/guides/custom-extensions)
