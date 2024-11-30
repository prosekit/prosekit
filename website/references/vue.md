# prosekit/vue

## ProseKitProps {#prose-kit-props-4}

<dl>

<dt>

`editor: Editor<any>`

</dt>

<dd>

</dd>

</dl>

## UseExtensionOptions {#use-extension-options-4}

<dl>

<dt>

`editor?: MaybeRefOrGetter<Editor<any>>`

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

</dd>

<dt>

`priority?: Priority`

</dt>

<dd>

Optional priority to add the extension with.

</dd>

</dl>

## VueNodeViewOptions {#vue-node-view-options}

Options for [defineVueNodeView](vue.md#define-vue-node-view).

<dl>

<dt>

`as?: string | HTMLElement | ((node: Node) => HTMLElement)`

</dt>

<dd>

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

</dd>

<dt>

`component: VueNodeViewComponent`

</dt>

<dd>

The Vue component to render the node.

</dd>

<dt>

`contentAs?: string | HTMLElement | ((node: Node) => HTMLElement)`

</dt>

<dd>

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

</dd>

<dt>

`deselectNode?: () => void`

</dt>

<dd>

</dd>

<dt>

`destroy?: () => void`

</dt>

<dd>

</dd>

<dt>

`ignoreMutation?: (mutation: ViewMutationRecord) => boolean`

</dt>

<dd>

</dd>

<dt>

`name: string`

</dt>

<dd>

The name of the node type.

</dd>

<dt>

`onUpdate?: () => void`

</dt>

<dd>

</dd>

<dt>

`selectNode?: () => void`

</dt>

<dd>

</dd>

<dt>

`setSelection?: (anchor: number, head: number, root: Document | ShadowRoot) => void`

</dt>

<dd>

</dd>

<dt>

`stopEvent?: (event: Event) => boolean`

</dt>

<dd>

</dd>

<dt>

`update?: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean`

</dt>

<dd>

</dd>

</dl>

## VueNodeViewProps {#vue-node-view-props}

<dl>

<dt>

`contentRef: VNodeRef`

</dt>

<dd>

</dd>

<dt>

`decorations: ShallowRef<readonly Decoration[]>`

</dt>

<dd>

</dd>

<dt>

`getPos: () => undefined | number`

</dt>

<dd>

</dd>

<dt>

`innerDecorations: ShallowRef<DecorationSource>`

</dt>

<dd>

</dd>

<dt>

`node: ShallowRef<Node>`

</dt>

<dd>

</dd>

<dt>

`selected: ShallowRef<boolean>`

</dt>

<dd>

</dd>

<dt>

`setAttrs: (attrs: Attrs) => void`

</dt>

<dd>

</dd>

<dt>

`view: EditorView`

</dt>

<dd>

</dd>

</dl>

## VueNodeViewComponent {#vue-node-view-component}

**Type**: `DefineComponent<VueNodeViewProps, any, any>`

## ProseKit {#prose-kit-4}

The root component for a ProseKit editor.

**Type**: `DefineSetupFnComponent<ProseKitProps, {}, {}, ProseKitProps & {}, PublicProps>`

## defineVueNodeView {#define-vue-node-view}

```ts
function defineVueNodeView(options: VueNodeViewOptions): Extension
```

Defines a node view using a Vue component.

## useDocChange {#use-doc-change-4}

```ts
function useDocChange(handler: (doc: Node) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor document changes.

## useEditor {#use-editor-4}

```ts
function useEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options?: { update?: boolean }): ShallowRef<Editor<E>>
```

Retrieves the editor instance from the nearest ProseKit component.

## useExtension {#use-extension-4}

```ts
function useExtension(extension: MaybeRefOrGetter<null | Extension<ExtensionTyping<any, any, any>>>, options?: UseExtensionOptions): void
```

Add an extension to the editor.

## useKeymap {#use-keymap-4}

```ts
function useKeymap(keymap: MaybeRefOrGetter<Keymap>, options?: UseExtensionOptions): void
```

## useStateUpdate {#use-state-update-4}

```ts
function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor state changes.
