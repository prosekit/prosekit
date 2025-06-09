---
title: prosekit/solid
sidebar:
  label: solid
---


## SolidMarkViewOptions {#solid-mark-view-options}

Options for [defineSolidMarkView](solid.md#define-solid-mark-view).

<dl>

<dt>

`as?: MarkViewDOMSpec`

</dt>

<dd>

</dd>

<dt>

`component: SolidMarkViewComponent`

</dt>

<dd>

</dd>

<dt>

`contentAs?: MarkViewDOMSpec`

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

The name of the mark type.

</dd>

</dl>

## SolidMarkViewProps {#solid-mark-view-props}

<dl>

<dt>

`contentRef: MarkViewContentRef`

</dt>

<dd>

</dd>

<dt>

`mark: Mark`

</dt>

<dd>

</dd>

<dt>

`view: EditorView`

</dt>

<dd>

</dd>

</dl>

## SolidNodeViewOptions {#solid-node-view-options}

Options for [defineSolidNodeView](solid.md#define-solid-node-view).

<dl>

<dt>

`as?: NodeViewDOMSpec`

</dt>

<dd>

</dd>

<dt>

`component: SolidNodeViewComponent`

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

`update?: (node: ProseMirrorNode, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean | void`

</dt>

<dd>

</dd>

</dl>

## SolidNodeViewProps {#solid-node-view-props}

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

`node: ProseMirrorNode`

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

## UseExtensionOptions {#use-extension-options-2}

<dl>

<dt>

`editor?: MaybeAccessor<Editor<any>>`

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

## MaybeAccessor {#maybe-accessor}

T or a reactive/non-reactive function returning T

**Type**: `T | Accessor<T>`

## ProseKitProps {#prose-kit-props-2}

**Type**: `ParentProps<{ editor: Editor }>`

## SolidMarkViewComponent {#solid-mark-view-component}

**Type**: `Component<SolidMarkViewProps>`

## SolidNodeViewComponent {#solid-node-view-component}

**Type**: `Component<SolidNodeViewProps>`

## defineSolidMarkView {#define-solid-mark-view}

```ts
function defineSolidMarkView(options: SolidMarkViewOptions): Extension
```

Defines a mark view using a Solid component.

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
function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void
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
