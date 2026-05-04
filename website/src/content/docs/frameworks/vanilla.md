---
title: Vanilla JavaScript
description: Use ProseKit without a UI framework
sidebar:
  order: 70
---

No framework? No problem. ProseKit works with plain [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) out of the box via `prosekit/core`.

## Minimal editor

```ts twoslash
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'

const editor = createEditor({ extension: defineBasicExtension() })

const root = document.querySelector('#editor')
if (root) {
  editor.mount(root as HTMLElement)
}
```

## Lifecycle

You're responsible for `mount` / `unmount` and any clean-up. There is no provider; pass the `editor` instance to anything that needs it.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const editor = createEditor({ extension: defineBasicExtension() })
declare const root: HTMLElement
// ---cut---
editor.mount(root)

// when you're done with the editor:
editor.unmount()
```

`editor.use(extension)` and the per-event handlers from [`prosekit/core`](/references/core) (e.g. [`defineKeymap`](/references/core#definekeymap), [`defineDocChangeHandler`](/references/core#definedocchangehandler)) let you wire dynamic behavior without a framework.

## Reacting to changes

Listen for state updates with `defineUpdateHandler` or the `view.dom` element directly:

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, defineUpdateHandler } from 'prosekit/core'

const editor = createEditor({ extension: defineBasicExtension() })

editor.use(defineUpdateHandler((view) => {
  console.log(view.state.doc.textContent)
}))
```

For input events, use the per-event handlers in [`prosekit/core`](/references/core), including `defineKeyDownHandler`, `defineClickHandler`, and `definePasteHandler`.

## Components

The pre-built UI components are shipped as native custom elements via [`prosekit/web/*`](/references/web). They work in any framework, or none at all, because they're standard Web Components. Import the component subpaths you want; each one registers its `<prosekit-…>` elements as a side effect.

```ts
import 'prosekit/web/menu'
import 'prosekit/web/inline-popover'
```

## See also

- [The Editor concept page](/concepts/editor)
- [`prosekit/core` reference](/references/core)
- [`prosekit/web` reference](/references/web)
