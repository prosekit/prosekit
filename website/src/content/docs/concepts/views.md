---
title: Views
description: Node views, mark views, and decorations, including when to reach for them and which framework wrapper to use
sidebar:
  order: 70
---

A **view** customizes how the editor renders a node or mark in the DOM. For most schemas the `toDOM` you wrote in the spec is enough. Reach for a view when you need:

- Interactive content (buttons, inputs, dropdowns inside a node).
- Live data (an embed that fetches metadata, a widget that updates on selection changes).
- Per-instance state that ProseMirror's selection model can't express.

## Node views

[`defineNodeView`](/references/core#definenodeview) takes a name and a ProseMirror [`NodeViewConstructor`](https://prosemirror.net/docs/ref/#view.NodeViewConstructor).

```ts twoslash
import { defineNodeView } from 'prosekit/core'

const myNodeView = defineNodeView({
  name: 'image',
  constructor: (node) => {
    const dom = document.createElement('img')
    dom.src = String(node.attrs.src ?? '')
    return { dom }
  },
})
```

In practice you'll almost always use the framework wrapper instead of the raw helper. Each integration ships a `define<Framework>NodeView` that lets you write the view as a component:

| Framework | Wrapper                                                           |
| --------- | ----------------------------------------------------------------- |
| React     | [`defineReactNodeView`](/references/react#definereactnodeview)    |
| Vue       | [`defineVueNodeView`](/references/vue#definevuenodeview)          |
| Preact    | [`definePreactNodeView`](/references/preact#definepreactnodeview) |
| Svelte    | [`defineSvelteNodeView`](/references/svelte#definesveltenodeview) |
| Solid     | [`defineSolidNodeView`](/references/solid#definesolidnodeview)    |

```tsx
import { defineReactNodeView, type ReactNodeViewProps } from 'prosekit/react'

function ImageView(props: ReactNodeViewProps) {
  const src = String(props.node.attrs.src ?? '')
  return <img src={src} alt={String(props.node.attrs.alt ?? '')} />
}

const extension = defineReactNodeView({
  name: 'image',
  component: ImageView,
})
```

`ReactNodeViewProps` (and its peers in other frameworks) gives you `node`, `view`, `getPos`, `setAttrs`, `decorations`, and `selected`.

## Mark views

[`defineMarkView`](/references/core#definemarkview) and [`define<Framework>MarkView`](/references/react#definereactmarkview) do the same job for marks. Use them sparingly, since most marks are perfectly served by a `toDOM` in the mark spec.

A typical use case is a comment or annotation mark that needs a popover when its text is selected.

## Decorations

Decorations sit on top of the document without changing the schema. They're great for showing collaborator cursors, search highlights, or inline error squiggles. Decorations live inside ProseMirror plugins; register them with [`definePlugin`](/references/core#defineplugin).

```ts twoslash
import { definePlugin } from 'prosekit/core'
import { Plugin } from 'prosekit/pm/state'
import { Decoration, DecorationSet } from 'prosekit/pm/view'

const highlight = definePlugin(() => {
  return new Plugin({
    props: {
      decorations(state) {
        return DecorationSet.create(state.doc, [
          Decoration.inline(0, state.doc.content.size, { class: 'highlight' }),
        ])
      },
    },
  })
})
```

The `Plugin`, `Decoration`, and `DecorationSet` imports come from [`prosekit/pm`](/references/pm), which re-exports the underlying ProseMirror packages.

## When _not_ to reach for a view

- If the only goal is custom CSS, pass a `class:` attribute from `toDOM` instead.
- If the goal is a non-editable pill (e.g., a chip), see if a regular inline node with `atom: true` is enough.
- If you need to render React/Vue/etc. _outside_ the document (a toolbar, a slash menu), use a normal component from [Components](/components/overview). Node views are only for in-document UI.

## See also

- [Schema](/concepts/schema)
- [Frameworks → React](/frameworks/react), [Vue](/frameworks/vue), etc.
- [`prosekit/core` reference](/references/core)
