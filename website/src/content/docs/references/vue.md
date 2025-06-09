---
title: prosekit/vue
sidebar:
  label: vue
---


## ProseKitProps {#prose-kit-props-4}

<dl>

<dt>

`editor: Editor`

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

## VueMarkViewOptions {#vue-mark-view-options}

Options for [defineVueMarkView](vue.md#define-vue-mark-view).

<dl>

<dt>

`as?: MarkViewDOMSpec`

</dt>

<dd>

</dd>

<dt>

`component: VueMarkViewComponent`

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

## VueMarkViewProps {#vue-mark-view-props}

<dl>

<dt>

`contentRef: VNodeRef`

</dt>

<dd>

</dd>

<dt>

`mark: ShallowRef<Mark>`

</dt>

<dd>

</dd>

<dt>

`view: EditorView`

</dt>

<dd>

</dd>

</dl>

## VueNodeViewOptions {#vue-node-view-options}

Options for [defineVueNodeView](vue.md#define-vue-node-view).

<dl>

<dt>

`as?: NodeViewDOMSpec`

</dt>

<dd>

</dd>

<dt>

`component: VueNodeViewComponent`

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

`node: ShallowRef<ProseMirrorNode>`

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

## VueMarkViewComponent {#vue-mark-view-component}

**Type**: `DefineComponent<VueMarkViewProps, any, any>`

## VueNodeViewComponent {#vue-node-view-component}

**Type**: `DefineComponent<VueNodeViewProps, any, any>`

## ProseKit {#prose-kit-4}

The root component for a ProseKit editor.

**Type**: `DefineSetupFnComponent<ProseKitProps>`

## defineVueMarkView {#define-vue-mark-view}

```ts
function defineVueMarkView(options: VueMarkViewOptions): Extension
```

Defines a mark view using a Vue component.

## defineVueNodeView {#define-vue-node-view}

```ts
function defineVueNodeView(options: VueNodeViewOptions): Extension
```

Defines a node view using a Vue component.

## useDocChange {#use-doc-change-4}

```ts
function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void
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
