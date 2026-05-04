---
title: Custom node views
description: Render a node with a framework component when toDOM isn't enough
sidebar:
  order: 65
---

Most nodes render fine via the `toDOM` you wrote in their spec. Reach for a **node view** when you need:

- Interactive content inside the node (buttons, inputs).
- Live data (an embed that fetches metadata).
- Per-instance state ProseMirror's selection model can't express.

See [Concepts → Views](/concepts/views) for the full mental model; this guide is the cookbook.

## Pick the right wrapper

Every framework integration ships a `define<Framework>NodeView`:

| Framework | Wrapper                                                           |
| --------- | ----------------------------------------------------------------- |
| React     | [`defineReactNodeView`](/references/react#definereactnodeview)    |
| Vue       | [`defineVueNodeView`](/references/vue#definevuenodeview)          |
| Preact    | [`definePreactNodeView`](/references/preact#definepreactnodeview) |
| Svelte    | [`defineSvelteNodeView`](/references/svelte#definesveltenodeview) |
| Solid     | [`defineSolidNodeView`](/references/solid#definesolidnodeview)    |

If you don't use any of these frameworks, use the framework-agnostic [`defineNodeView`](/references/core#definenodeview) which takes a ProseMirror `NodeViewConstructor`.

## Recipe: a clickable image

```tsx
import { union } from 'prosekit/core'
import { defineImage } from 'prosekit/extensions/image'
import { defineReactNodeView, type ReactNodeViewProps } from 'prosekit/react'

function ImageView(props: ReactNodeViewProps) {
  const src = String(props.node.attrs.src ?? '')
  return (
    <img
      src={src}
      alt={String(props.node.attrs.alt ?? '')}
      data-selected={props.selected ? '' : undefined}
    />
  )
}

export function defineCustomImage() {
  return union(
    defineImage(),
    defineReactNodeView({
      name: 'image',
      component: ImageView,
    }),
  )
}
```

The `selected` prop comes from the editor selection. Use it to highlight the node when the user clicks on it.

## Updating attributes

`props.setAttrs(partial)` updates the node attributes. Combine with the [Resizable](/components/resizable) component to persist drag-resize state:

```tsx
import type { ReactNodeViewProps } from 'prosekit/react'
import { ResizableHandle, ResizableRoot } from 'prosekit/react/resizable'

function ResizableImageView(props: ReactNodeViewProps) {
  return (
    <ResizableRoot
      width={Number(props.node.attrs.width ?? 480)}
      onResizeEnd={({ width }) => props.setAttrs({ width })}
    >
      <img src={String(props.node.attrs.src ?? '')} />
      <ResizableHandle />
    </ResizableRoot>
  )
}
```

## More examples:

- [code-block-themes](/examples/code-block-themes): a code block that lets you pick a syntax highlighting theme from a dropdown
- [image-view](/examples/image-view): custom image node views with resize support.
