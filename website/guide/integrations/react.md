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
change. Check out [react-word-counter](/examples/react-word-counter) for a
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

Check out [react-keymap](/examples/react-keymap) for a complete implementation.

## `defineReactNodeView`

Renders a node using a React component.

In some cases, React might be a more convenient tool for implementing certain interactions. For example, the code blocks below have a language button in the top left corner. Clicking this button opens a combobox that lets you change the language of the code block. This feature is implemented using a React component.

<script setup>
import App from '../../components/vue-code-block/editor.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><App/></ClientOnly>
:::

We begin by creating a `CodeBlockView` component to render the node. This component receives [`ReactNodeViewProps`](/references/react/#reactnodeviewoptions) as props, which include the node and other useful details.

::: code-group
<<< @/../playground/examples/react-code-block/react-block-view.tsx [react-block-view.tsx]
:::

`CodeBlockView` renders a `LanguageSelector` component (the button in the top left corner) and a `<pre>` element to hold the code. We bind the `contentRef` to the `<pre>` element, which allows the editor to manage its content.

After defining the component, we can register it as a node view using [`defineReactNodeView`](/references/react/#defineReactNodeView). The `name` is the node's name, in this case `"codeBlock"`. `contentAs` is the property name that contains the node's content. In this case, it's `"code"`, which means a `<code>` element will be rendered inside the `<pre>` element. `component` is the component we just defined.

```ts
import {
  defineReactNodeView,
  type ReactNodeViewComponent,
} from 'prosekit/react'
import CodeBlockView from './code-block-view.tsx'

defineReactNodeView({
  name: 'codeBlock',
  contentAs: 'code',
  component: CodeBlockView satisfies ReactNodeViewComponent,
})
```

Check out [react-code-block](/examples/react-code-block) for a complete implementation.
