# prosekit/svelte

## ProseKitProps {#prose-kit-props-3}

<dl>

<dt>

`editor: Editor<any>`

</dt>

<dd>

</dd>

</dl>

## SvelteNodeViewOptions {#svelte-node-view-options}

Options for [defineSvelteNodeView](svelte.md#define-svelte-node-view).

<dl>

<dt>

`as?: string | HTMLElement | ((node: Node) => HTMLElement)`

</dt>

<dd>

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

</dd>

<dt>

`component: SvelteNodeViewComponent`

</dt>

<dd>

The Svelte component to render the node.

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

## SvelteNodeViewProps {#svelte-node-view-props}

<dl>

<dt>

`contentRef: (node: null | HTMLElement) => void`

</dt>

<dd>

</dd>

<dt>

`decorations: Writable<readonly Decoration[]>`

</dt>

<dd>

</dd>

<dt>

`getPos: () => undefined | number`

</dt>

<dd>

</dd>

<dt>

`innerDecorations: Writable<DecorationSource>`

</dt>

<dd>

</dd>

<dt>

`node: Writable<Node>`

</dt>

<dd>

</dd>

<dt>

`selected: Writable<boolean>`

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

## UseExtensionOptions {#use-extension-options-3}

<dl>

<dt>

`editor?: Editor<any>`

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

## SvelteNodeViewComponent {#svelte-node-view-component}

**Type**: `Component<SvelteNodeViewProps>`

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
