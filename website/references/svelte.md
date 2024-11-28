# prosekit/svelte

## ProseKitProps {#prose-kit-props-3}

<dl>

<dt>

`editor`

</dt>

<dd>

**Type**: `Editor<any>`

</dd>

</dl>

## SvelteNodeViewOptions {#svelte-node-view-options}

Options for [defineSvelteNodeView](svelte.md#define-svelte-node-view).

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

The Svelte component to render the node.

**Type**: `SvelteNodeViewComponent`

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

## SvelteNodeViewProps {#svelte-node-view-props}

<dl>

<dt>

`contentRef`

</dt>

<dd>

**Type**: `(node: null | HTMLElement) => void`

</dd>

<dt>

`decorations`

</dt>

<dd>

**Type**: `Writable<readonly Decoration[]>`

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

**Type**: `Writable<DecorationSource>`

</dd>

<dt>

`node`

</dt>

<dd>

**Type**: `Writable<Node>`

</dd>

<dt>

`selected`

</dt>

<dd>

**Type**: `Writable<boolean>`

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

## UseExtensionOptions {#use-extension-options-3}

<dl>

<dt>

`editor`

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

**Type**: `Editor<any>`

</dd>

<dt>

`priority`

</dt>

<dd>

Optional priority to add the extension with.

**Type**: `Priority`

</dd>

</dl>

## SvelteNodeViewComponent {#svelte-node-view-component}

**Type**: `ComponentType<SvelteComponent<SvelteNodeViewProps>>`

## ProseKit {#prose-kit-3}

The root component for a ProseKit editor.

**Type**: `typeof SvelteComponent`

## defineSvelteNodeView {#define-svelte-node-view}

```ts
function defineSvelteNodeView(options: SvelteNodeViewOptions): Extension
```

Defines a node view using a Svelte component.

## useDocChange {#use-doc-change-3}

```ts
function useDocChange(handler: (doc: Node) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor document changes.

## useEditor {#use-editor-3}

```ts
function useEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options?: { update?: boolean }): Readable<Editor<E>>
```

Retrieves the editor instance from the nearest ProseKit component.

## useExtension {#use-extension-3}

```ts
function useExtension<T extends Extension<ExtensionTyping<any, any, any>>>(extension: Readable<null | T>, options?: UseExtensionOptions): void
```

Add an extension to the editor.

## useKeymap {#use-keymap-3}

```ts
function useKeymap(keymapStore: Readable<Keymap>, options?: UseExtensionOptions): void
```

## useStateUpdate {#use-state-update-3}

```ts
function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor state changes.
