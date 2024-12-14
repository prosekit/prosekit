# prosekit/react

## ProseKitProps {#prose-kit-props-1}

<dl>

<dt>

`children?: ReactNode`

</dt>

<dd>

</dd>

<dt>

`editor: Editor<any>`

</dt>

<dd>

</dd>

</dl>

## ReactNodeViewOptions {#react-node-view-options}

Options for [defineReactNodeView](react.md#define-react-node-view).

<dl>

<dt>

`as?: NodeViewDOMSpec`

</dt>

<dd>

</dd>

<dt>

`component: ReactNodeViewComponent`

</dt>

<dd>

</dd>

<dt>

`contentAs?: NodeViewDOMSpec`

</dt>

<dd>

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

`ignoreMutation?: (mutation: ViewMutationRecord) => boolean | void`

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

`update?: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean | void`

</dt>

<dd>

</dd>

</dl>

## ReactNodeViewProps {#react-node-view-props}

<dl>

<dt>

`contentRef: NodeViewContentRef`

</dt>

<dd>

</dd>

<dt>

`decorations: readonly Decoration[]`

</dt>

<dd>

</dd>

<dt>

`getPos: () => undefined | number`

</dt>

<dd>

</dd>

<dt>

`innerDecorations: DecorationSource`

</dt>

<dd>

</dd>

<dt>

`node: Node`

</dt>

<dd>

</dd>

<dt>

`selected: boolean`

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

## UseExtensionOptions {#use-extension-options-1}

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

## ReactNodeViewComponent {#react-node-view-component}

**Type**: `ComponentType<ReactNodeViewProps>`

## ProseKit {#prose-kit-1}

The root component for a ProseKit editor.

**Type**: `ComponentType<ProseKitProps>`

## defineReactNodeView {#define-react-node-view}

```ts
function defineReactNodeView(options: ReactNodeViewOptions): Extension
```

Defines a node view using a React component.

## useDocChange {#use-doc-change-1}

```ts
function useDocChange(handler: (doc: Node) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor document changes.

## useEditor {#use-editor-1}

```ts
function useEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options?: { update?: boolean }): Editor<E>
```

Retrieves the editor instance from the nearest ProseKit component.

## useExtension {#use-extension-1}

```ts
function useExtension(extension: null | Extension<ExtensionTyping<any, any, any>>, options?: UseExtensionOptions): void
```

Add an extension to the editor.

## useKeymap {#use-keymap-1}

```ts
function useKeymap(keymap: Keymap, options?: UseExtensionOptions): void
```

## useStateUpdate {#use-state-update-1}

```ts
function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor state changes.
