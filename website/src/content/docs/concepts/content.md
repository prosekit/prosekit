---
title: Content
description: How to round trip the editor's document between JSON, HTML, and ProseMirror nodes
sidebar:
  order: 60
---

The editor's document is a ProseMirror `Node`. ProseKit's content helpers convert between that and the two formats you'll actually persist: JSON and HTML.

## Reading the current document

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
// ---cut---
const json = editor.getDocJSON()
const html = editor.getDocHTML()
```

`getDocJSON()` returns a [`NodeJSON`](/references/core#nodejson), a plain object that's safe to `JSON.stringify`. `getDocHTML()` returns a string of standard HTML.

## Loading initial content

`createEditor` accepts `defaultContent` directly. ProseKit detects the type:

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, type NodeJSON } from 'prosekit/core'

const extension = defineBasicExtension()

// JSON object → treated as a NodeJSON.
const fromJson: NodeJSON = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }],
}
const a = createEditor({ extension, defaultContent: fromJson })

// String → treated as HTML.
const b = createEditor({ extension, defaultContent: '<p>Hello</p>' })

// DOM element → parsed as HTML.
declare const el: HTMLElement
const c = createEditor({ extension, defaultContent: el })
```

You can also pair `defaultContent` with `defaultSelection` to position the cursor on load.

## Replacing the document at runtime

[`setContent`](/references/core#setcontent) accepts the same shapes:

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
// ---cut---
editor.setContent('<p>Replaced</p>', 'end')
editor.setContent({ type: 'doc', content: [] }, 'start')
```

The optional second argument selects where the cursor lands: `'start'`, `'end'`, or a `SelectionJSON`.

## Conversion utilities

Sometimes you want to serialize content from outside the editor (e.g. on a server, or while preparing initial content). `prosekit/core` exposes pure functions you can call:

| Function                                        | Input             | Output            |
| ----------------------------------------------- | ----------------- | ----------------- |
| [`jsonFromNode`](/references/core#jsonfromnode) | `ProseMirrorNode` | `NodeJSON`        |
| [`nodeFromJSON`](/references/core#nodefromjson) | `NodeJSON`        | `ProseMirrorNode` |
| [`jsonFromHTML`](/references/core#jsonfromhtml) | `string`          | `NodeJSON`        |
| [`htmlFromJSON`](/references/core#htmlfromjson) | `NodeJSON`        | `string`          |
| [`nodeFromHTML`](/references/core#nodefromhtml) | `string`          | `ProseMirrorNode` |
| [`htmlFromNode`](/references/core#htmlfromnode) | `ProseMirrorNode` | `string`          |

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'

function defineMyEditorExtension() {
  return defineBasicExtension()
}

// ---cut---
import { htmlFromJSON, jsonFromHTML } from 'prosekit/core'

const extension = defineMyEditorExtension()
const schema = extension.schema
if (!schema) throw new Error('Extension is missing a schema')
const json = jsonFromHTML('<p>Hello</p>', { schema })
const html = htmlFromJSON(json, { schema })
```

## See also

- [Saving and Loading](/guides/saving-and-loading)
- [The Editor](/concepts/editor)
- [`prosekit/core` reference](/references/core)
