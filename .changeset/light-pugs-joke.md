---
'prosekit': patch
'@prosekit/react': minor
---

A new `useEditorDerivedValue` hook is added to `prosekit/react`. This hook is the recommended way to read values from the editor state, replacing the older `useEditor({ update: true })` pattern.

The `useEditor({ update: true })` pattern can cause issues because the `editor` instance is an external system outside React. Reading its value directly during rendering (e.g., `editor.nodes.heading.isActive()`) is a side effect and violates the [Rules of React](https://react.dev/learn/rules-of-react). Conceptually, the `editor` acts as an external mutable store. In React, `useSyncExternalStore` is the recommended API for subscribing to such stores.

`useEditorDerivedValue` is a hook built on these principles, tailored for ProseKit. It provides a safe and efficient way to derive values from the editor state for use in your components, ensuring compatibility with React's rendering model and tools like the React Compiler.

### Using the `derive` Function

`useEditorDerivedValue` accepts a `derive` function as its first argument. This function:

1.  Receives the `editor` instance.
2.  Computes and returns a value based on the editor's current state.
3.  Is called when the editor mounts and whenever the editor's document or selection state changes.

Crucially, the **`derive` function must be memoized**. If it's re-created on every render, `useEditorDerivedValue` might not work as expected and could lead to performance issues.

- **If defined inside a component, wrap `derive` with `useCallback`:**

  ```tsx
  // ✅ Good: derive function is memoized
  const isBoldActive = useEditorDerivedValue(
    useCallback((editor) => editor.marks.bold.isActive(), []),
  )
  ```

- **If defined outside a component, it's naturally stable:**

  ```tsx
  // ✅ Good: derive function is stable (defined outside)
  function getBoldState(editor) {
    return editor.marks.bold.isActive()
  }

  function MyComponent() {
    const isBoldActive = useEditorDerivedValue(getBoldState)
    // ...
  }
  ```

- **Avoid inline, non-memoized `derive` functions:**

  ```tsx
  // ❌ Bad: derive function is not memoized
  const isBoldActive = useEditorDerivedValue((editor) =>
    editor.marks.bold.isActive(),
  )
  ```

### Migration Example

Here is a quick example of how to migrate from `useEditor({ update: true })` to the new hook:

```tsx
// Before
import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canExec({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
        tooltip="Heading 1"
      >
        H1
      </Button>
      <Button
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canExec({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
        tooltip="Heading 2"
      >
        H2
      </Button>
    </div>
  )
}
```

```tsx
// After
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    heading1: {
      isActive: editor.nodes.heading.isActive({ level: 1 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 1 }),
      command: () => editor.commands.toggleHeading({ level: 1 }),
    },
    heading2: {
      isActive: editor.nodes.heading.isActive({ level: 2 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 2 }),
      command: () => editor.commands.toggleHeading({ level: 2 }),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.heading1.isActive}
        disabled={!items.heading1.canExec}
        onClick={items.heading1.command}
        tooltip="Heading 1"
      >
        H1
      </Button>

      <Button
        pressed={items.heading2.isActive}
        disabled={!items.heading2.canExec}
        onClick={items.heading2.command}
        tooltip="Heading 2"
      >
        H2
      </Button>
    </div>
  )
}
```
