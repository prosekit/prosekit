---
title: React
description: Use ProseKit with React
sidebar:
  order: 10
---

ProseKit has first-class support for [React](https://react.dev) via `prosekit/react`.

## Provider

`<ProseKit editor={editor}>` provides context to its descendants. The component itself does not render any DOM, it only forwards children.

```tsx twoslash
// @jsx: react-jsx
'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineBasicExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className="editor" />
    </ProseKit>
  )
}
```

## Hooks

All hooks are exported from `prosekit/react`.

### `useEditor`

```ts-tags
useEditor(): Editor
```

Read the editor instance from the nearest `<ProseKit>` provider. The returned reference is stable; for UI that depends on editor state, use [`useEditorDerivedValue`](#useeditorderivedvalue).

```tsx
import { useEditor } from 'prosekit/react'

function BoldButton() {
  const editor = useEditor()
  return (
    <button onClick={() => editor.commands.toggleBold()}>
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
): Derived
```

Compute a value from the editor and re-render whenever the editor state changes. Memoise `derive` (or define it outside the component), since it's used as the dependency key for the underlying store.

```tsx
import type { Editor } from 'prosekit/core'
import { useEditor, useEditorDerivedValue } from 'prosekit/react'

function getToolbarState(editor: Editor) {
  return {
    boldActive: editor.marks.bold.isActive(),
    boldEnabled: editor.commands.toggleBold.canExec(),
  }
}

function Toolbar() {
  const editor = useEditor()
  const state = useEditorDerivedValue(getToolbarState)
  return (
    <button
      disabled={!state.boldEnabled}
      data-active={state.boldActive}
      onClick={() => editor.commands.toggleBold()}
    >
      Bold
    </button>
  )
}
```

### `useExtension`

```ts-tags
useExtension(
  extension: Extension | null,
  options?: { editor?: Editor; priority?: Priority },
): void
```

Register an extension for the lifetime of the calling component. When `extension` changes (or becomes `null`), the previous one is removed and the new one is added. Useful for features that turn on/off conditionally.

```tsx
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/react'

function ShikiHighlightToggle({ enabled }: { enabled: boolean }) {
  useExtension(enabled ? defineCodeBlockShiki() : null)
  return null
}
```

### `useKeymap`

```ts-tags
useKeymap(keymap: Keymap, options?: UseExtensionOptions): void
```

Bind a keymap for the lifetime of the calling component.

```tsx
import { useKeymap } from 'prosekit/react'

function SaveOnCmdS({ onSave }: { onSave: () => void }) {
  useKeymap({
    'Mod-s': () => {
      onSave()
      return true
    },
  })
  return null
}
```

### `useDocChange`

```ts-tags
useDocChange(
  handler: (doc: ProseMirrorNode) => void,
  options?: UseExtensionOptions,
): void
```

Run `handler` whenever the editor's document changes. The handler receives the current document node. Use `editor.getDocJSON()` from inside if you need JSON.

```tsx
import { useDocChange, useEditor } from 'prosekit/react'

function AutoSave() {
  const editor = useEditor()
  useDocChange(() => {
    localStorage.setItem('doc', JSON.stringify(editor.getDocJSON()))
  })
  return null
}
```

### `useStateUpdate`

```ts-tags
useStateUpdate(
  handler: (state: EditorState) => void,
  options?: UseExtensionOptions,
): void
```

Same as `useDocChange` but fires on **every** state update, including selection changes and cursor moves. Use this for selection-sensitive UI that doesn't need to wait for document edits.

## Custom node and mark views

### `defineReactNodeView`

```ts-tags
defineReactNodeView(options: {
  name: string
  component: ComponentType<ReactNodeViewProps>
  // plus the standard CoreNodeViewUserOptions fields
}): Extension
```

Render a node with a React component. `ReactNodeViewProps` exposes `node`, `view`, `getPos`, `setAttrs`, `decorations`, and `selected`.

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

### `defineReactMarkView`

```ts-tags
defineReactMarkView(options: {
  name: string
  component: ComponentType<ReactMarkViewProps>
}): Extension
```

Same as `defineReactNodeView` but for marks.

## See also

- [The Editor concept page](/concepts/editor)
- [Extensions & union](/concepts/extensions)
- [Components](/components/overview): pre-built React components for toolbar, inline menu, slash menu, and friends.
- [`prosekit/react` reference](/references/react)
- [Minimal example](/examples/minimal?framework=react)
- [Full-featured example](/examples/full?framework=react)
