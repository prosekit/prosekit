# Vue Integration

ProseKit is designed to work seamlessly with Vue.

::: code-group
<<< @/../playground/src/examples/vue/minimal/editor.vue
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

This is useful if you want to update the UI based on the current editor state.
For example, you can calculate the word count of the document after every
change. Check out [word-counter] for a complete implementation.

## `useExtension`

Adds an extension to the editor.

```ts
const extension = computed(() => defineMyExtension())
useExtension(extension)
```

## `useKeymap`

Adds key bindings to the editor.

::: code-group
<<< @/../playground/src/examples/vue/keymap/use-submit-keymap.ts
:::

Check out [keymap] for a complete implementation.

## `defineVueNodeView`

Renders a node using a Vue component.

In some cases, Vue might be a more convenient tool for implementing certain interactions. For instance, for a code block, you might want to add a language selector that lets you change the language of the code block. You can implement this using a Vue component.

We begin by creating a `CodeBlockView` component to render the node. This component receives [`VueNodeViewProps`] as props, which include the node and other useful details.

::: code-group
<<< @/../playground/src/examples/vue/code-block/code-block-view.vue [code-block-view.vue]
:::

`CodeBlockView` renders a `LanguageSelector` component (the button in the top left corner) and a `<pre>` element to hold the code. We bind the `contentRef` to the `<pre>` element, which allows the editor to manage its content.

After defining the component, we can register it as a node view using [`defineVueNodeView`]. The `name` is the node's name, in this case `"codeBlock"`. `contentAs` is the property name that contains the node's content. In this case, it's `"code"`, which means a `<code>` element will be rendered inside the `<pre>` element. `component` is the component we just defined.

```ts twoslash
// @filename: code-block-view.vue.ts

import type * as m from 'prosekit/vue'

const Component: m.VueNodeViewComponent = {} as any
export default Component
// ---cut---
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'
import CodeBlockView from './code-block-view.vue'

const extension = defineVueNodeView({
  name: 'codeBlock',
  contentAs: 'code',
  component: CodeBlockView as VueNodeViewComponent,
})
```

Check out [code-block] for a complete example.

## `defineVueMarkView`

Similar to [`defineVueNodeView`], [`defineVueMarkView`] renders a mark using a Vue component.

Check out [link-mark-view] for a complete example.

[keymap]: /examples/keymap
[code-block]: /examples/code-block
[link-mark-view]: /examples/link-mark-view
[word-counter]: /examples/word-counter
[`VueNodeViewProps`]: /references/vue#vue-node-view-props
[`defineVueNodeView`]: /references/vue#define-vue-node-view
[`defineVueMarkView`]: /references/vue#define-vue-mark-view
