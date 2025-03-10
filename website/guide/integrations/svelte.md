# Svelte Integration

ProseKit is designed to work seamlessly with Svelte.

::: code-group
<<< @/../playground/src/examples/svelte/minimal/editor.svelte
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
change. Check out [word-counter] for a
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
<<< @/../playground/src/examples/svelte/keymap/use-submit-keymap.ts
:::

Check out [keymap] for a complete implementation.

## `defineSvelteNodeView`

Renders a node using a Svelte component.

In some cases, Svelte might be a more convenient tool for implementing certain interactions. For instance, for a code block, you might want to add a language selector that lets you change the language of the code block. You can implement this using a Svelte component.

We begin by creating a `CodeBlockView` component to render the node. This component receives [`SvelteNodeViewProps`] as props, which include the node and other useful details.

::: code-group
<<< @/../playground/src/examples/svelte/code-block/code-block-view.svelte [code-block-view.svelte]
:::

`CodeBlockView` renders a `LanguageSelector` component (the button in the top left corner) and a `<pre>` element to hold the code. We bind the `contentRef` to the `<pre>` element, which allows the editor to manage its content.

After defining the component, we can register it as a node view using [`defineSvelteNodeView`]. The `name` is the node's name, in this case `"codeBlock"`. `contentAs` is the property name that contains the node's content. In this case, it's `"code"`, which means a `<code>` element will be rendered inside the `<pre>` element. `component` is the component we just defined.

```ts twoslash
// @filename: code-block-view.svelte.ts

import type * as m from 'prosekit/svelte'

const Component: m.SvelteNodeViewComponent = {} as any
export default Component
// ---cut---
import type { SvelteNodeViewComponent } from 'prosekit/svelte'
import { defineSvelteNodeView } from 'prosekit/svelte'
import CodeBlockView from './code-block-view.svelte'

const extension = defineSvelteNodeView({
  name: 'codeBlock',
  contentAs: 'code',
  component: CodeBlockView as SvelteNodeViewComponent,
})
```

Check out [code-block] for a complete example.

## `defineSvelteMarkView`

Similar to [`defineSvelteNodeView`], [`defineSvelteMarkView`] renders a mark using a Svelte component.

Check out [link-mark-view] for a complete example.

[keymap]: /examples/keymap
[code-block]: /examples/code-block
[link-mark-view]: /examples/link-mark-view
[word-counter]: /examples/word-counter
[`SvelteNodeViewProps`]: /references/svelte#svelte-node-view-props
[`defineSvelteNodeView`]: /references/svelte#define-svelte-node-view
[`defineSvelteMarkView`]: /references/svelte#define-svelte-mark-view
