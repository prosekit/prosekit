---
title: Preact
description: Use ProseKit with Preact
sidebar:
  order: 30
---

ProseKit has first-class support for [Preact](https://preactjs.com) via `prosekit/preact`.

## Provider

`<ProseKit editor={editor}>` provides context to its descendants. The component itself does not render any DOM, it only forwards children. Always wrap any UI that calls `useEditor()` in this provider.

```tsx twoslash
// @jsx: react-jsx
// @jsxImportSource: preact
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { useMemo } from 'preact/hooks'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineBasicExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="editor" />
    </ProseKit>
  )
}
```

## Hooks

Same shape as [React](/frameworks/react):

- `useEditor()` → `Editor`
- `useEditorDerivedValue(derive, options?)` → derived value
- `useExtension(extension, options?)`
- `useKeymap(keymap, options?)`
- `useDocChange(handler: (doc: ProseMirrorNode) => void, options?)`
- `useStateUpdate(handler: (state: EditorState) => void, options?)`

## Custom node and mark views

```tsx
import { definePreactNodeView, type PreactNodeViewProps } from 'prosekit/preact'

function ImageView(props: PreactNodeViewProps) {
  const src = String(props.node.attrs.src ?? '')
  return <img src={src} alt={String(props.node.attrs.alt ?? '')} />
}

const extension = definePreactNodeView({
  name: 'image',
  component: ImageView,
})
```

`definePreactMarkView` is the mark equivalent.

## See also

- [React](/frameworks/react): full hook documentation that applies here too.
- [The Editor concept page](/concepts/editor)
- [`prosekit/preact` reference](/references/preact)
- [Minimal example](/examples/minimal?framework=preact)
- [Full-featured example](/examples/full?framework=preact)
