# prosekit/vue

## ProseKitProps {#prose-kit-props-4}

<dl>

<dt>

`editor`

</dt>

<dd>

**Type**: `Editor<any>`

</dd>

</dl>

## UseExtensionOptions {#use-extension-options-4}

<dl>

<dt>

`editor`

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

**Type**: `MaybeRefOrGetter<Editor<any>>`

</dd>

<dt>

`priority`

</dt>

<dd>

Optional priority to add the extension with.

**Type**: `Priority`

</dd>

</dl>

## VueNodeViewOptions {#vue-node-view-options}

Options for [defineVueNodeView](vue.md#define-vue-node-view).

<dl>

<dt>

`as`

</dt>

<dd>

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

**Type**: `string | HTMLElement | ((node: Node) => HTMLElement)`

</dd>

<dt>

`component`

</dt>

<dd>

The Vue component to render the node.

**Type**: `VueNodeViewComponent`

</dd>

<dt>

`contentAs`

</dt>

<dd>

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

**Type**: `string | HTMLElement | ((node: Node) => HTMLElement)`

</dd>

<dt>

`deselectNode`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`destroy`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`ignoreMutation`

</dt>

<dd>

**Type**: `(mutation: ViewMutationRecord) => boolean`

</dd>

<dt>

`name`

</dt>

<dd>

The name of the node type.

**Type**: `string`

</dd>

<dt>

`onUpdate`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`selectNode`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`setSelection`

</dt>

<dd>

**Type**: `(anchor: number, head: number, root: Document | ShadowRoot) => void`

</dd>

<dt>

`stopEvent`

</dt>

<dd>

**Type**: `(event: Event) => boolean`

</dd>

<dt>

`update`

</dt>

<dd>

**Type**: `(node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean`

</dd>

</dl>

## VueNodeViewProps {#vue-node-view-props}

<dl>

<dt>

`contentRef`

</dt>

<dd>

**Type**: `VNodeRef`

</dd>

<dt>

`decorations`

</dt>

<dd>

**Type**: `ShallowRef<readonly Decoration[]>`

</dd>

<dt>

`getPos`

</dt>

<dd>

**Type**: `() => undefined | number`

</dd>

<dt>

`innerDecorations`

</dt>

<dd>

**Type**: `ShallowRef<DecorationSource>`

</dd>

<dt>

`node`

</dt>

<dd>

**Type**: `ShallowRef<Node>`

</dd>

<dt>

`selected`

</dt>

<dd>

**Type**: `ShallowRef<boolean>`

</dd>

<dt>

`setAttrs`

</dt>

<dd>

**Type**: `(attrs: Attrs) => void`

</dd>

<dt>

`view`

</dt>

<dd>

**Type**: `EditorView`

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
