# prosekit/solid

## SolidNodeViewOptions {#solid-node-view-options}

Options for [defineSolidNodeView](solid.md#define-solid-node-view).

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

The Solid component to render the node.

**Type**: `SolidNodeViewComponent`

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

## SolidNodeViewProps {#solid-node-view-props}

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

**Type**: `readonly Decoration[]`

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

**Type**: `DecorationSource`

</dd>

<dt>

`node`

</dt>

<dd>

**Type**: `Node`

</dd>

<dt>

`selected`

</dt>

<dd>

**Type**: `boolean`

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

## UseExtensionOptions {#use-extension-options-2}

<dl>

<dt>

`editor`

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

**Type**: `MaybeAccessor<Editor<any>>`

</dd>

<dt>

`priority`

</dt>

<dd>

Optional priority to add the extension with.

**Type**: `Priority`

</dd>

</dl>

## MaybeAccessor {#maybe-accessor}

T or a reactive/non-reactive function returning T

**Type**: `T | Accessor<T>`

## ProseKitProps {#prose-kit-props-2}

**Type**: `ParentProps<{ editor: Editor }>`

## SolidNodeViewComponent {#solid-node-view-component}

**Type**: `Component<SolidNodeViewProps>`

## defineSolidNodeView {#define-solid-node-view}

```ts
function defineSolidNodeView(options: SolidNodeViewOptions): Extension
```

Defines a node view using a Solid component.

## ProseKit {#prose-kit-2}

The root component for a ProseKit editor.

```ts
function ProseKit(props: ProseKitProps): Element
```

## useDocChange {#use-doc-change-2}

```ts
function useDocChange(handler: (doc: Node) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor document changes.

## useEditor {#use-editor-2}

```ts
function useEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options?: { update?: boolean }): () => Editor<E>
```

Retrieves the editor instance from the nearest ProseKit component.

## useExtension {#use-extension-2}

```ts
function useExtension(extension: Accessor<null | Extension<ExtensionTyping<any, any, any>>>, options?: UseExtensionOptions): void
```

Add an extension to the editor.

## useKeymap {#use-keymap-2}

```ts
function useKeymap(keymap: () => Keymap, options?: UseExtensionOptions): void
```

## useStateUpdate {#use-state-update-2}

```ts
function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor state changes.
