---
title: prosekit/react
sidebar:
  label: react
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### ProseKitProps {#prosekitprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### children? {#children}

```ts
optional children: ReactNode;
```

<!-- DEBUG inheritance start kind=1024 -->

##### editor {#editor}

```ts
editor: Editor;
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### ReactMarkViewOptions {#reactmarkviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineReactMarkView](#definereactmarkview).

#### Extends

- `CoreMarkViewUserOptions`\<[`ReactMarkViewComponent`](#reactmarkviewcomponent)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### as? {#as}

```ts
optional as: MarkViewDOMSpec;
```

<!-- DEBUG inheritance start kind=1024 -->

##### component {#component}

```ts
component: ReactMarkViewComponent;
```

<!-- DEBUG inheritance start kind=1024 -->

##### contentAs? {#contentas}

```ts
optional contentAs: MarkViewDOMSpec;
```

<!-- DEBUG inheritance start kind=1024 -->

##### destroy()? {#destroy}

```ts
optional destroy: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### ignoreMutation()? {#ignoremutation}

```ts
optional ignoreMutation: (mutation: ViewMutationRecord) => boolean | void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mutation`

</td>
<td>

[`ViewMutationRecord`](pm/view.md#viewmutationrecord)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### name {#name}

```ts
name: string;
```

The name of the mark type.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### ReactMarkViewProps {#reactmarkviewprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `MarkViewContext`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentRef {#contentref}

```ts
contentRef: MarkViewContentRef;
```

<!-- DEBUG inheritance start kind=1024 -->

##### mark {#mark}

```ts
mark: Mark;
```

<!-- DEBUG inheritance start kind=1024 -->

##### view {#view}

```ts
view: EditorView;
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### ReactNodeViewOptions {#reactnodeviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineReactNodeView](#definereactnodeview).

#### Extends

- `CoreNodeViewUserOptions`\<[`ReactNodeViewComponent`](#reactnodeviewcomponent)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### as? {#as-1}

```ts
optional as: NodeViewDOMSpec;
```

<!-- DEBUG inheritance start kind=1024 -->

##### component {#component-1}

```ts
component: ReactNodeViewComponent;
```

<!-- DEBUG inheritance start kind=1024 -->

##### contentAs? {#contentas-1}

```ts
optional contentAs: NodeViewDOMSpec;
```

<!-- DEBUG inheritance start kind=1024 -->

##### deselectNode()? {#deselectnode}

```ts
optional deselectNode: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### destroy()? {#destroy-1}

```ts
optional destroy: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### ignoreMutation()? {#ignoremutation-1}

```ts
optional ignoreMutation: (mutation: ViewMutationRecord) => boolean | void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mutation`

</td>
<td>

[`ViewMutationRecord`](pm/view.md#viewmutationrecord)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### name {#name-1}

```ts
name: string;
```

The name of the node type.

<!-- DEBUG inheritance start kind=1024 -->

##### onUpdate()? {#onupdate}

```ts
optional onUpdate: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### selectNode()? {#selectnode}

```ts
optional selectNode: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### setSelection()? {#setselection}

```ts
optional setSelection: (anchor: number, head: number, root: 
  | Document
  | ShadowRoot) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`anchor`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`head`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`root`

</td>
<td>

 \| [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### stopEvent()? {#stopevent}

```ts
optional stopEvent: (event: Event) => boolean;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

[`Event`](https://developer.mozilla.org/docs/Web/API/Event)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### update()? {#update}

```ts
optional update: (node: ProseMirrorNode, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean | void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`decorations`

</td>
<td>

readonly [`Decoration`](pm/view.md#decoration)[]

</td>
</tr>
<tr>
<td>

`innerDecorations`

</td>
<td>

[`DecorationSource`](pm/view.md#decorationsource)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### ReactNodeViewProps {#reactnodeviewprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `NodeViewContext`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentRef {#contentref-1}

```ts
contentRef: NodeViewContentRef;
```

<!-- DEBUG inheritance start kind=1024 -->

##### decorations {#decorations}

```ts
decorations: readonly Decoration[];
```

<!-- DEBUG inheritance start kind=1024 -->

##### getPos() {#getpos}

```ts
getPos: () => undefined | number;
```

###### Returns

`undefined` \| `number`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### innerDecorations {#innerdecorations}

```ts
innerDecorations: DecorationSource;
```

<!-- DEBUG inheritance start kind=1024 -->

##### node {#node}

```ts
node: ProseMirrorNode;
```

<!-- DEBUG inheritance start kind=1024 -->

##### selected {#selected}

```ts
selected: boolean;
```

<!-- DEBUG inheritance start kind=1024 -->

##### setAttrs() {#setattrs}

```ts
setAttrs: (attrs: Attrs) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`attrs`

</td>
<td>

[`Attrs`](pm/model.md#attrs-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### view {#view-1}

```ts
view: EditorView;
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### UseEditorDerivedOptions\<E\> {#useeditorderivedoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`E` *extends* [`Extension`](core.md#extension-1)

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### editor? {#editor-1}

```ts
optional editor: Editor<E>;
```

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### UseExtensionOptions {#useextensionoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### editor? {#editor-2}

```ts
optional editor: Editor<any>;
```

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

<!-- DEBUG inheritance start kind=1024 -->

##### priority? {#priority}

```ts
optional priority: Priority;
```

Optional priority to add the extension with.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### ReactMarkViewComponent {#reactmarkviewcomponent}

```ts
type ReactMarkViewComponent = ComponentType<ReactMarkViewProps>;
```

<!-- DEBUG inheritance start kind=2097152 -->

***

### ReactNodeViewComponent {#reactnodeviewcomponent}

```ts
type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>;
```

<!-- DEBUG inheritance start kind=2097152 -->

## Variables

### ProseKit {#prosekit}

```ts
const ProseKit: ComponentType<ProseKitProps>;
```

The root component for a ProseKit editor.

<!-- DEBUG inheritance start kind=32 -->

## Functions

### defineReactMarkView() {#definereactmarkview}

```ts
function defineReactMarkView(options: ReactMarkViewOptions): Extension;
```

Defines a mark view using a React component.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`ReactMarkViewOptions`](#reactmarkviewoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](core.md#extension-1)

<!-- DEBUG inheritance start kind=4096 -->

***

### defineReactNodeView() {#definereactnodeview}

```ts
function defineReactNodeView(options: ReactNodeViewOptions): Extension;
```

Defines a node view using a React component.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`ReactNodeViewOptions`](#reactnodeviewoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](core.md#extension-1)

<!-- DEBUG inheritance start kind=4096 -->

***

### useDocChange() {#usedocchange}

```ts
function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void;
```

Calls the given handler whenever the editor document changes.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`handler`

</td>
<td>

(`doc`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `void`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`UseExtensionOptions`](#useextensionoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

***

### useEditor() {#useeditor}

```ts
function useEditor<E>(options?: object): Editor<E>;
```

Retrieves the editor instance from the nearest ProseKit component.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`E` *extends* [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options?`

</td>
<td>

\{ `update?`: `boolean`; \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options.update?`

</td>
<td>

`boolean`

</td>
<td>

Whether to update the component when the editor is mounted or editor state
is updated.

Note this this option doesn't work with [React
compiler](https://react.dev/learn/react-compiler) because the returned
editor will be the same instance after state updates. If you're using React
compiler, you should use [useEditorDerivedValue](#useeditorderivedvalue) instead.

**Default**

```ts
false
```

</td>
</tr>
</tbody>
</table>

#### Returns

[`Editor`](core.md#editor)\<`E`\>

<!-- DEBUG inheritance start kind=4096 -->

***

### useEditorDerivedValue() {#useeditorderivedvalue}

```ts
function useEditorDerivedValue<E, Derived>(derive: (editor: Editor<E>) => Derived, options?: UseEditorDerivedOptions<E>): Derived;
```

A hook that runs a function to derive a value from the editor instance after
editor state changes.

This is useful when you need to render something based on the editor state,
for example, whether the selected text is wrapped in an italic mark.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`E` *extends* [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

</td>
</tr>
<tr>
<td>

`Derived`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`derive`

</td>
<td>

(`editor`: [`Editor`](core.md#editor)\<`E`\>) => `Derived`

</td>
<td>

A function that receives the editor instance and returns a derived value.

It will be called whenever the editor's document state changes, or when it
mounts.

This function should be memoized.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`UseEditorDerivedOptions`](#useeditorderivedoptions)\<`E`\>

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`Derived`

<!-- DEBUG inheritance start kind=4096 -->

***

### useExtension() {#useextension}

```ts
function useExtension(extension: 
  | null
  | Extension<ExtensionTyping<any, any, any>>, options?: UseExtensionOptions): void;
```

Add an extension to the editor.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`extension`

</td>
<td>

 \| `null` \| [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

</td>
<td>

The extension to add to the editor. If it changes, the previous
extension will be removed and the new one (if not null) will be added.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`UseExtensionOptions`](#useextensionoptions)

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

***

### useKeymap() {#usekeymap}

```ts
function useKeymap(keymap: Keymap, options?: UseExtensionOptions): void;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`keymap`

</td>
<td>

[`Keymap`](core.md#keymap)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`UseExtensionOptions`](#useextensionoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

***

### useStateUpdate() {#usestateupdate}

```ts
function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void;
```

Calls the given handler whenever the editor state changes.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`handler`

</td>
<td>

(`state`: [`EditorState`](pm/state.md#editorstate)) => `void`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`UseExtensionOptions`](#useextensionoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
