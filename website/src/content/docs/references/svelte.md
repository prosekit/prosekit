---
title: prosekit/svelte
sidebar:
  label: svelte
---


## ProseKitProps {#prose-kit-props-3}

<dl>

<dt>

`editor: Editor`

</dt>

<dd>

</dd>

</dl>

## SvelteMarkViewOptions {#svelte-mark-view-options}

Options for [defineSvelteMarkView](svelte.md#define-svelte-mark-view).

<dl>

<dt>

`as?: MarkViewDOMSpec`

</dt>

<dd>

</dd>

<dt>

`component: SvelteMarkViewComponent`

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

## SvelteMarkViewProps {#svelte-mark-view-props}

<dl>

<dt>

`contentRef: (element: null | HTMLElement) => void`

</dt>

<dd>

</dd>

<dt>

`mark: Writable<Mark>`

</dt>

<dd>

</dd>

<dt>

`view: EditorView`

</dt>

<dd>

</dd>

</dl>

## SvelteNodeViewOptions {#svelte-node-view-options}

Options for [defineSvelteNodeView](svelte.md#define-svelte-node-view).

<dl>

<dt>

`as?: NodeViewDOMSpec`

</dt>

<dd>

</dd>

<dt>

`component: SvelteNodeViewComponent`

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

## SvelteNodeViewProps {#svelte-node-view-props}

<dl>

<dt>

`contentRef: (element: null | HTMLElement) => void`

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

`node: Writable<ProseMirrorNode>`

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

## SvelteMarkViewComponent {#svelte-mark-view-component}

**Type**: `Component<SvelteMarkViewProps>`

## SvelteNodeViewComponent {#svelte-node-view-component}

**Type**: `Component<SvelteNodeViewProps>`

## ProseKit {#prose-kit-3}

The root component for a ProseKit editor.

**Type**: `typeof SvelteComponent`

## defineSvelteMarkView {#define-svelte-mark-view}

```ts
function defineSvelteMarkView(options: SvelteMarkViewOptions): Extension
```

Defines a mark view using a Svelte component.

## defineSvelteNodeView {#define-svelte-node-view}

```ts
function defineSvelteNodeView(options: SvelteNodeViewOptions): Extension
```

Defines a node view using a Svelte component.

## useDocChange {#use-doc-change-3}

```ts
function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void
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
