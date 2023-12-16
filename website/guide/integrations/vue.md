# Vue Integration

ProseKit is designed to work seamlessly with Vue.

::: code-group
<<< @/../playground/examples/vue-minimal/editor.vue
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
change. Check out [vue-word-counter](/examples/vue-word-counter) for a
complete implementation.

## `useExtension`

Adds an extension to the editor.

```ts
const extension = computed(() => defineMyExtension())
useExtension(extension)
```

## `useKeymap`

Adds key bindings to the editor.

::: code-group
<<< @/../playground/examples/vue-keymap/use-submit-keymap.ts
:::

Check out [vue-keymap](/examples/vue-keymap) for a complete implementation.

## `defineVueNodeView`

Renders a node using a Vue component.

In some cases, Vue might be a more convenient tool for implementing certain interactions. For instance, consider the code blocks below, each featuring a language button in the top left corner. Clicking this button opens a combobox that lets you change the language of the code block. This functionality is implemented using a Vue component.

<script setup>
import App from '../../components/vue-code-block/editor.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><App/></ClientOnly>
:::

We begin by creating a `CodeBlockView` component to render the node. This component receives [`VueNodeViewProps`](/references/vue/#vuenodeviewoptions) as props, which include the node and other useful details.

::: code-group
<<< @/../playground/examples/vue-code-block/code-block-view.vue [code-block-view.vue]
:::

`CodeBlockView` renders a `LanguageSelector` component (the button in the top left corner) and a `<pre>` element to hold the code. We bind the `contentRef` to the `<pre>` element, which allows the editor to manage its content.

After defining the component, we can register it as a node view using [`defineVueNodeView`](/references/vue/#defineVueNodeView). The `name` is the node's name, in this case `"codeBlock"`. `contentAs` is the property name that contains the node's content. In this case, it's `"code"`, which means a `<code>` element will be rendered inside the `<pre>` element. `component` is the component we just defined.

```ts
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'
import CodeBlockView from './code-block-view.vue'

defineVueNodeView({
  name: 'codeBlock',
  contentAs: 'code',
  component: CodeBlockView as VueNodeViewComponent,
})
```

Check out [vue-code-block](/examples/vue-code-block) for a complete implementation.
