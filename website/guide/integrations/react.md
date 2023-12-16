# React Integration

ProseKit is designed to work seamlessly with React.

::: code-group
<<< @/../playground/examples/react-minimal/editor.tsx
:::

## `useEditor`

Retrieves the current editor instance within a `ProseKit` component.

```ts
const editor = useEditor()
```

If you pass `{ update: true }`, it will trigger a re-render when the editor state changes.

```ts
const editor = useEditor({ update: true })
```

This is usefull if you want to update the UI based on the current editor state.
For example, you can calculate the word count of the document after every
change. Check out [react-word-count](/examples/react-word-count) for a
complete implementation.

## `useExtension`

Adds an extension to the editor.

```ts
const extension = useMemo(() => defineMyExtension(), [])
useExtension(extension)
```

## `useKeymap`

Adds key bindings to the editor.

::: code-group
<<< @/../playground/examples/react-keymap/use-submit-keymap.ts
:::

Check out [this example](/examples/react-keymap) for a complete implementation.
