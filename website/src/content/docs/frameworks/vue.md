---
title: Vue
description: Use ProseKit with Vue
sidebar:
  order: 20
---

ProseKit has first-class support for [Vue](https://vuejs.org) via `prosekit/vue`.

## Provider

`<ProseKit :editor="editor">` provides context to its descendants. The component itself does not render any DOM, it only forwards children.

```vue
<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'

const extension = defineBasicExtension()
const editor = createEditor({ extension })
</script>

<template>
  <ProseKit :editor="editor">
    <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="editor" />
  </ProseKit>
</template>
```

## Composables

All composables live in `prosekit/vue`.

### `useEditor`

```ts-tags
useEditor(options?: {
  update?: boolean
}): ShallowRef<Editor>
```

Returns the editor instance from the nearest `<ProseKit>` provider as a `ShallowRef`. Pass `{ update: true }` to trigger reactive updates when the editor state changes.

```vue
<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

const editor = useEditor()

function toggleBold() {
  editor.value.commands.toggleBold()
}
</script>

<template>
  <button @click="toggleBold">Bold</button>
</template>
```

### `useEditorDerivedValue`

```ts-tags
useEditorDerivedValue(
  derive: (editor: Editor) => Derived,
  options?: { editor?: Editor },
): ShallowRef<Derived>
```

Returns a `ShallowRef` that updates whenever the editor state changes. Use this for derived UI state. It skips re-running `derive` between edits, which is what you want for toolbar enabled/active flags.

```vue
<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditor, useEditorDerivedValue } from 'prosekit/vue'

const editor = useEditor()

function getToolbarState(editor: Editor) {
  return {
    boldActive: editor.marks.bold.isActive(),
    boldEnabled: editor.commands.toggleBold.canExec(),
  }
}

const state = useEditorDerivedValue(getToolbarState)
</script>

<template>
  <button
    :disabled="!state.boldEnabled"
    :data-active="state.boldActive"
    @click="editor.commands.toggleBold()"
  >
    Bold
  </button>
</template>
```

### `useExtension`

```ts-tags
useExtension(
  extension: Extension | null,
  options?: { editor?: Editor; priority?: Priority },
): void
```

Register an extension for the lifetime of the calling component.

### `useKeymap`

```ts-tags
useKeymap(
  keymap: MaybeRefOrGetter<Keymap>,
  options?: UseExtensionOptions,
): void
```

Bind a keymap. Pass a ref or getter to swap the bindings reactively.

```vue
<script setup lang="ts">
import { useKeymap } from 'prosekit/vue'
import { computed } from 'vue'

const props = defineProps<{ enabled: boolean }>()

useKeymap(computed(() =>
  props.enabled
    ? {
      'Mod-s': () => {
        console.log('save')
        return true
      },
    }
    : {}
))
</script>
```

### `useDocChange`

```ts-tags
useDocChange(
  handler: (doc: ProseMirrorNode) => void,
  options?: UseExtensionOptions,
): void
```

Run `handler` whenever the editor's document changes. The handler receives the current document node.

### `useStateUpdate`

```ts-tags
useStateUpdate(
  handler: (state: EditorState) => void,
  options?: UseExtensionOptions,
): void
```

Same as `useDocChange` but fires on every state update, including selection changes.

## Custom node and mark views

### `defineVueNodeView`

```ts-tags
defineVueNodeView(options: {
  name: string
  component: Component
}): Extension
```

Render a node with a Vue component. The component receives `node`, `view`, `getPos`, `setAttrs`, `decorations`, and `selected` as props (`VueNodeViewProps`).

```vue
<!-- ImageView.vue -->
<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'
const props = defineProps<VueNodeViewProps>()
</script>

<template>
  <img :src="String(props.node.attrs.src ?? '')" :alt="String(props.node.attrs.alt ?? '')" />
</template>
```

```ts
import { defineVueNodeView } from 'prosekit/vue'

import ImageView from './ImageView.vue'

const extension = defineVueNodeView({
  name: 'image',
  component: ImageView,
})
```

### `defineVueMarkView`

Same shape as `defineVueNodeView` but for marks.

## See also

- [The Editor concept page](/concepts/editor)
- [Extensions & union](/concepts/extensions)
- [Components](/components/overview): pre-built Vue components for toolbar, inline menu, slash menu, and friends.
- [`prosekit/vue` reference](/references/vue)
- [Minimal example](/examples/minimal?framework=vue)
- [Full-featured example](/examples/full?framework=vue)
