---
title: Solid
description: Use ProseKit with Solid
sidebar:
  order: 50
---

ProseKit has first-class support for [Solid](https://solidjs.com) via `prosekit/solid`.

## Provider

`<ProseKit editor={editor}>` provides context to its descendants. The component itself does not render any DOM, it only forwards children. Always wrap any UI that calls `useEditor()` in this provider.

```tsx twoslash
// @jsx: react-jsx
// @jsxImportSource: solid-js
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

export default function Editor(): JSX.Element {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="editor" />
    </ProseKit>
  )
}
```

## Hooks

### `useEditor`

```ts-tags
useEditor(options?: {
  update?: boolean
}): () => Editor
```

Returns an accessor `() => Editor`. Call it inside JSX or effects.

```tsx
import { useEditor } from 'prosekit/solid'
import type { JSX } from 'solid-js'

export function BoldButton(): JSX.Element {
  const editor = useEditor()
  return (
    <button onClick={() => editor().commands.toggleBold()}>
      Bold
    </button>
  )
}
```

### `useEditorDerivedValue`

```ts-tags
useEditorDerivedValue(
  derive: (editor: Editor) => Derived,
  options?: { editor?: Editor },
): () => Derived
```

Returns an accessor that re-runs `derive` on every editor state change.

### `useExtension`, `useKeymap`, `useDocChange`, `useStateUpdate`

Same options shape as [React](/frameworks/react). All four return `void` and bind to the calling component's lifecycle.

## Custom node and mark views

```tsx
import { defineSolidNodeView, type SolidNodeViewProps } from 'prosekit/solid'
import type { JSX } from 'solid-js'

function ImageView(props: SolidNodeViewProps): JSX.Element {
  const src = () => String(props.node.attrs.src ?? '')
  return <img src={src()} alt={String(props.node.attrs.alt ?? '')} />
}

const extension = defineSolidNodeView({
  name: 'image',
  component: ImageView,
})
```

`defineSolidMarkView` is the mark equivalent.

## See also

- [The Editor concept page](/concepts/editor)
- [Components](/components/overview)
- [`prosekit/solid` reference](/references/solid)
- [Minimal example](/examples/minimal?framework=solid)
- [Full-featured example](/examples/full?framework=solid)
