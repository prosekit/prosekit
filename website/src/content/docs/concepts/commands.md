---
title: Commands
description: How commands flow through the editor, defining custom commands, and binding keys
sidebar:
  order: 50
---

A **command** is a function that may modify the editor state. ProseKit exposes them in two flavors: low-level ProseMirror commands, and high-level "command actions" that the editor wraps around them.

## Two ways to call a command

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
// ---cut---
// 1. The named action exposed on the editor.
editor.commands.toggleBold()
editor.commands.setHeading({ level: 2 })

// 2. A raw ProseMirror command, executed via editor.exec.
import { toggleMark } from 'prosekit/core'
editor.exec(toggleMark({ type: 'bold' }))
```

The action form is what you'll use 95% of the time. It's typed (you get autocomplete for every command your extensions registered) and it exposes `.canExec()` for "is this currently applicable?":

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
// ---cut---
const enabled = editor.commands.toggleBold.canExec()
```

## Built-in commands

Most extensions ship a command pair like [`toggleBold`](/extensions/bold) / [`setHeading`](/extensions/heading) on `editor.commands`.

Useful low-level commands also live on `prosekit/core`:

| Command                                                     | Notes                                           |
| ----------------------------------------------------------- | ----------------------------------------------- |
| [`addMark`](/references/core#addmark)                       | Apply a mark to a range.                        |
| [`removeMark`](/references/core#removemark)                 | Remove a mark from a range.                     |
| [`toggleMark`](/references/core#togglemark)                 | Toggle a mark on the current selection.         |
| [`unsetMark`](/references/core#unsetmark)                   | Drop stored marks (affects newly typed text).   |
| [`expandMark`](/references/core#expandmark)                 | Expand the selection to cover an existing mark. |
| [`setBlockType`](/references/core#setblocktype)             | Change the current block to a specific type.    |
| [`unsetBlockType`](/references/core#unsetblocktype)         | Reset the current block to the default.         |
| [`toggleNode`](/references/core#togglenode)                 | Toggle the current block between two types.     |
| [`toggleWrap`](/references/core#togglewrap)                 | Toggle a wrapping node (e.g. blockquote).       |
| [`wrap`](/references/core#wrap)                             | Wrap the selection in a node.                   |
| [`insertNode`](/references/core#insertnode)                 | Insert a node at the selection.                 |
| [`removeNode`](/references/core#removenode)                 | Remove the nearest node of a type.              |
| [`setNodeAttrs`](/references/core#setnodeattrs)             | Update attributes on the current node.          |
| [`selectAll`](/references/core#selectall)                   | Move selection to the whole document.           |
| [`selectBlock`](/references/core#selectblock)               | Select the current block node.                  |
| [`insertDefaultBlock`](/references/core#insertdefaultblock) | Insert the default block (usually a paragraph). |

See the [`prosekit/core` reference](/references/core) for full signatures.

## Defining your own command

Use [`defineCommands`](/references/core#definecommands) (note the plural; the singular `defineCommand` does not exist). The keys become the action names; each value is a function that returns a ProseMirror `Command`.

```ts twoslash
import { defineCommands } from 'prosekit/core'

const myCommands = defineCommands({
  insertHello: () => (state, dispatch) => {
    if (dispatch) {
      dispatch(state.tr.insertText('Hello!'))
    }
    return true
  },
  insertNTimes: (text: string, n: number) => (state, dispatch) => {
    if (dispatch) {
      dispatch(state.tr.insertText(text.repeat(n)))
    }
    return true
  },
})
```

Later, you can call `editor.commands.insertHello()` and `editor.commands.insertNTimes('Hey', 3)`, with their argument types inferred from the function signatures.

## Keymaps

[`defineKeymap`](/references/core#definekeymap) maps a key string to a `Command`. See [Keyboard Shortcuts](/guides/keyboard-shortcuts) for the full key syntax (`Mod`, `Shift`, `Alt`, `Meta`, etc.).

```ts twoslash
import { defineKeymap, toggleMark } from 'prosekit/core'

const keymap = defineKeymap({
  'Mod-b': toggleMark({ type: 'bold' }),
  'Mod-i': toggleMark({ type: 'italic' }),
  'Mod-u': toggleMark({ type: 'underline' }),
})
```

Every framework integration also exposes a `useKeymap` hook for binding keys conditionally (see the [React](/frameworks/react) page).

## See also

- [Extensions](/concepts/extensions)
- [Keyboard Shortcuts guide](/guides/keyboard-shortcuts)
- [`prosekit/core` reference](/references/core)
