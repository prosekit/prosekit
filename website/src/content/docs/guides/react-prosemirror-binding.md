---
title: React ProseMirror binding
description: Build a full editor with the experimental react-prosemirror-based React binding
sidebar:
  order: 66
---

This guide shows a complete editor built with `@prosekit/react-binding`, the experimental React package that keeps ProseKit's extension API but renders with `@handlewithcare/react-prosemirror`.

## What changes compared with `prosekit/react`

- Create the editor with `createReactBindingEditor(...)` instead of `createEditor(...)`.
- `<ProseKit editor={editor}>` owns the `EditorView`, but it does **not** render the document for you.
- You must render `<ProseMirrorDoc />` somewhere inside `<ProseKit>...</ProseKit>`.
- You do **not** mount a DOM node with `ref={editor.mount}`.
- Hooks such as `useEditor`, `useEditorDerivedValue`, `useExtension`, `useKeymap`, and `useDocChange` keep the same mental model.

In practice, the usage model is:

```tsx
<ProseKit editor={editor}>
  <Toolbar />
  <ProseMirrorDoc className="editor-content" />
</ProseKit>
```

## Full example

### `extension.ts`

```tsx
import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImage } from 'prosekit/extensions/image'
import {
  defineReactMarkView,
  defineReactNodeView,
} from '@prosekit/react-binding'

import { LinkView } from './link-view.tsx'
import { ImageView } from './image-view.tsx'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineImage(),
    defineReactMarkView({
      name: 'link',
      component: LinkView,
    }),
    defineReactNodeView({
      name: 'image',
      component: ImageView,
    }),
  )
}
```

### `image-view.tsx`

```tsx
'use client'

import type { ReactNodeViewProps } from '@prosekit/react-binding'

export function ImageView(props: ReactNodeViewProps) {
  const width = Number(props.node.attrs.width ?? 320)
  const src = String(props.node.attrs.src ?? '')

  return (
    <figure data-selected={props.selected ? '' : undefined}>
      <img
        src={src || undefined}
        alt={String(props.node.attrs.alt ?? '')}
        width={width}
      />
      <figcaption>
        <button
          type="button"
          onClick={() => props.setAttrs({ width: width === 320 ? 640 : 320 })}
        >
          Toggle width
        </button>
      </figcaption>
    </figure>
  )
}
```

### `link-view.tsx`

```tsx
'use client'

import type { ReactMarkViewProps } from '@prosekit/react-binding'

export function LinkView(props: ReactMarkViewProps) {
  const href = String(props.mark.attrs.href ?? '')

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  )
}
```

### `toolbar.tsx`

```tsx
'use client'

import {
  useDocChange,
  useEditor,
  useEditorDerivedValue,
  useKeymap,
} from '@prosekit/react-binding'
import { useCallback, useMemo } from 'react'

function getToolbarState(editor: ReturnType<typeof useEditor>) {
  return {
    boldActive: editor.marks.bold.isActive(),
    boldEnabled: editor.commands.toggleBold.canExec(),
    italicActive: editor.marks.italic.isActive(),
    italicEnabled: editor.commands.toggleItalic.canExec(),
  }
}

export function Toolbar() {
  const editor = useEditor()
  const state = useEditorDerivedValue(getToolbarState)

  const keymap = useMemo(() => ({
    'Mod-b': () => editor.commands.toggleBold(),
    'Mod-i': () => editor.commands.toggleItalic(),
  }), [editor])

  useKeymap(keymap)

  const saveDraft = useCallback(() => {
    localStorage.setItem('react-binding-doc', JSON.stringify(editor.getDocJSON()))
  }, [editor])

  const saveKeymap = useMemo(() => ({
    'Mod-s': () => {
      saveDraft()
      return true
    },
  }), [saveDraft])

  useKeymap(saveKeymap)

  useDocChange(() => {
    saveDraft()
  })

  return (
    <div className="toolbar">
      <button
        type="button"
        disabled={!state.boldEnabled}
        data-active={state.boldActive}
        onClick={() => editor.commands.toggleBold()}
      >
        Bold
      </button>
      <button
        type="button"
        disabled={!state.italicEnabled}
        data-active={state.italicActive}
        onClick={() => editor.commands.toggleItalic()}
      >
        Italic
      </button>
    </div>
  )
}
```

### `editor.tsx`

```tsx
'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { type NodeJSON } from 'prosekit/core'
import { createReactBindingEditor, ProseKit } from '@prosekit/react-binding'
import { useMemo } from 'react'

import { defineExtension } from './extension.ts'
import { Toolbar } from './toolbar.tsx'

const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This example uses ' },
        {
          type: 'text',
          text: '@handlewithcare/react-prosemirror',
          marks: [{
            type: 'link',
            attrs: {
              href: 'https://github.com/handlewithcarecollective/react-prosemirror',
              target: '_blank',
              rel: 'noreferrer',
            },
          }],
        },
        { type: 'text', text: ' under the hood.' },
      ],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Select text and use the toolbar or keyboard shortcuts.' }],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/640x360',
        alt: 'Sample image',
        width: 320,
      },
    },
  ],
}

export default function Editor(props: { initialContent?: NodeJSON }) {
  const defaultContent = props.initialContent ?? sampleContent

  const editor = useMemo(() => {
    return createReactBindingEditor({
      extension: defineExtension(),
      defaultContent,
    })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div className="CSS_EDITOR_SCROLLING">
          <ProseMirrorDoc className="CSS_EDITOR_CONTENT" />
        </div>
      </div>
    </ProseKit>
  )
}
```

## Notes

- `useDocChange` and `useKeymap` work the same way as in `prosekit/react`, so most toolbar and autosave code can move over unchanged.
- The main rendering difference is explicit: `react-binding` does not hide the document root. You compose it yourself by placing `ProseMirrorDoc` where you want the editable content to appear.
- `editor.getDocJSON()` is available on `ReactBindingEditor`, which makes autosave and persistence flows straightforward.
- Custom node views and mark views remain regular ProseKit extensions, so they still compose through `union(...)`.
