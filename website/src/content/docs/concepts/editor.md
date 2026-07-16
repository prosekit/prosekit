---
title: The Editor
description: The Editor instance lifecycle, methods, and live properties
sidebar:
  order: 20
---

The `Editor` is the central object you'll interact with at runtime. It wraps a ProseMirror `EditorView` and exposes typed shortcuts for the schema, commands, nodes, and marks contributed by your extensions.

## Creating an editor

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'

const extension = defineBasicExtension()
const editor = createEditor({ extension })
```

[`createEditor`](/references/core#createeditor) accepts:

| Option             | Type                            | Notes                                                                                                           |
| ------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `extension`        | `Extension`                     | Required. Usually a `union(...)` of `define*` calls.                                                            |
| `defaultContent`   | `NodeJSON \| string \| Element` | Optional initial document. It can be a ProseMirror node JSON object, an HTML string, or a DOM element instance. |
| `defaultSelection` | `SelectionJSON`                 | Optional initial selection (only used when `defaultContent` is set).                                            |

## Mounting and unmounting

The editor doesn't render anything until you mount it on a DOM element.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
declare const element: HTMLElement
// ---cut---
editor.mount(element)
// later:
editor.unmount()
```

Framework integrations call `mount`/`unmount` for you. See [Frameworks](/frameworks/react).

## Live properties

| Property   | Type             | What it gives you                                                    |
| ---------- | ---------------- | -------------------------------------------------------------------- |
| `mounted`  | `boolean`        | Whether the editor is currently attached to the DOM.                 |
| `view`     | `EditorView`     | Underlying ProseMirror view (only valid after `mount`).              |
| `state`    | `EditorState`    | The current ProseMirror state.                                       |
| `schema`   | `Schema`         | The merged schema, narrowed to the union of nodes/marks you defined. |
| `focused`  | `boolean`        | Whether the editor currently has focus.                              |
| `commands` | `CommandActions` | Typed command actions, keyed by every defined command.               |
| `nodes`    | `NodeActions`    | Typed node creators (also exposes `.isActive(attrs?)`).              |
| `marks`    | `MarkActions`    | Typed mark creators (also exposes `.isActive(attrs?)`).              |

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
// ---cut---
if (editor.commands.toggleBold.canExec()) {
  // Toggle the "bold" mark on the current selected text.
  editor.commands.toggleBold()
}

const isH1 = editor.nodes.heading.isActive({ level: 1 })
const isBold = editor.marks.bold.isActive()
```

## Methods

| Method                      | Purpose                                                              |
| --------------------------- | -------------------------------------------------------------------- |
| `setContent(content, sel?)` | Replace the document. `content` is `NodeJSON \| string \| Element`.  |
| `getDocJSON()`              | Return the current document as JSON.                                 |
| `getDocHTML(options?)`      | Render the document as an HTML string.                               |
| `exec(command)`             | Run a raw ProseMirror `Command`. Returns `true` on success.          |
| `canExec(command)`          | Test whether a raw command would succeed without running it.         |
| `use(extension)`            | Hot-add an extension at runtime. Returns a function that removes it. |
| `focus()` / `blur()`        | Imperatively change focus.                                           |
| `mount(el)` / `unmount()`   | Attach / detach from the DOM.                                        |

`commands.<name>.canExec()` is typically what you want for toolbar buttons. It returns `true` when the command would apply, which is the right signal for "is this button enabled?".

## Hot-replacing extensions

[`editor.use`](/references/core#use) registers an extension after the editor has been created. Use it for features that depend on runtime state (e.g., a search panel that's only active while open).

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, defineKeymap, type Extension } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
declare function saveDocument(json: unknown): void
// ---cut---
const saveExtension: Extension = defineKeymap({
  'Mod-s': () => {
    saveDocument(editor.getDocJSON())
    return true
  },
})
const dispose = editor.use(saveExtension)

// later, when you no longer want the binding:
dispose()
```

## See also

- [Extensions](/concepts/extensions)
- [Commands](/concepts/commands)
- [Content](/concepts/content)
- [`prosekit/core` reference](/references/core)
