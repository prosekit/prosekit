# Vue Integrating

ProseKit is designed to work seamlessly with Vue. 

::: code-group
<<< @/../playground/examples/vue-minimal/App.vue
:::

## `useEditor`

Retrieves the current editor instance within a `ProseKit` component. If you pass `{update: true}`, it will trigger a re-render when the editor state changes.

```ts
const editor = useEditor()
```

```ts
const editor = useEditor({ update: true })
```

## `useExtension`

Adds an extension to the editor.

```ts
const extension = computed(() => defineMyExtension())
useExtension(extension)
```

## `useKeymap`

Adds key bindings to the editor.

```ts
import { type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/vue'
import { computed } from 'vue'

const keymap: Keymap = computed((): Keymap => {
  return {
    "Shift-Enter": () => {
      window.alert(`Shift-Enter is pressed!`)
      return true
    },
  }
})

useKeymap(keymap)
```

For a comprehensive example of how to use `useKeymap`, refer to [this example](/examples/vue-keymap).

