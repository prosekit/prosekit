---
title: Svelte
description: Use ProseKit with Svelte
sidebar:
  order: 40
---

ProseKit has first-class support for [Svelte](https://svelte.dev) via `prosekit/svelte`.

## Provider

`<ProseKit {editor}>` provides context to its descendants. The component itself does not render any DOM, it only forwards children. Always wrap any UI that calls `useEditor()` in this provider.

```svelte
<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

const extension = defineBasicExtension()
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div bind:this={editor.mount} class="editor" />
</ProseKit>
```

## Hooks

### `useEditor`

```ts-tags
useEditor(options?: {
  update?: boolean
}): Readable<Editor>
```

Returns a Svelte `Readable` store. Pass `{ update: true }` if you want the store to fire on every editor state change.

```svelte
<script lang="ts">
import { useEditor } from 'prosekit/svelte'
const editor = useEditor()
</script>

<button onclick={() => $editor.commands.toggleBold()}>Bold</button>
```

### `useEditorDerivedValue`

```ts-tags
useEditorDerivedValue(
  derive: (editor: Editor) => Derived,
  options?: { editor?: Editor },
): Readable<Derived>
```

Returns a `Readable` that re-runs `derive` whenever the editor state changes.

### `useExtension`, `useKeymap`, `useDocChange`, `useStateUpdate`

Same options shape as [React](/frameworks/react). All four return `void` and bind to the calling component's lifecycle.

## Custom node and mark views

```ts
import { defineSvelteNodeView } from 'prosekit/svelte'

import ImageView from './ImageView.svelte'

const extension = defineSvelteNodeView({
  name: 'image',
  component: ImageView,
})
```

The Svelte component receives `node`, `view`, `getPos`, `setAttrs`, `decorations`, and `selected` as props (`SvelteNodeViewProps`). `defineSvelteMarkView` is the mark equivalent.

## See also

- [The Editor concept page](/concepts/editor)
- [Components](/components/overview)
- [`prosekit/svelte` reference](/references/svelte)
- [Minimal example](/examples/minimal?framework=svelte)
- [Full-featured example](/examples/full?framework=svelte)
