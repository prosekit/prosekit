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

## `defineReactNodeView`

Renders a node using a Vue component.

Sometimes it's easier to implement some interactions using Vue. For example, in the code blocks below, there is a button at the top left corner that allows you to popup a combobox to change the language of the code block. This is implemented using a Vue component.

<script setup>
import App from '../../components/vue-code-block/editor.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><App/></ClientOnly>
:::

We first define a component `CodeBlockView` that renders the node. The component receives [`VueNodeViewProps`](/api/interfaces/vue-node-view-props) as props. The props contains the node and some other useful information.

::: code-group
<<< @/../playground/examples/vue-code-block/code-block-view.vue [code-block-view.vue]
:::

`CodeBlockView` would render a `LanguageSelector` component, which is that button at the top left corner, and also a `<pre>` element to contain the code. We bind the `contentRef` to the `<pre>` element so that the editor can manage its content.

After the component is defined, we can register it as a node view using `defineVueNodeView`. The `name` is the name of the node, which is `"codeBlock"`. `contentAs` is the name of the property that contains the content of the node. In this case, it's `"code"`, which means that a `<code>` element would be rendered inside the `<pre>` element. `component` is the component we just defined.

```ts
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'
import CodeBlockView from './code-block-view.vue'

defineVueNodeView({
  name: 'codeBlock',
  contentAs: 'code',
  component: CodeBlockView as VueNodeViewComponent,
})
```

You can check out [vue-code-block](/examples/vue-code-block) for a complete implementation.
