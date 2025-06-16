---
title: prosekit/solid
sidebar:
  label: solid
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### SolidMarkViewOptions {#solidmarkviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineSolidMarkView](#definesolidmarkview).

#### Extends

- `CoreMarkViewUserOptions`\<[`SolidMarkViewComponent`](#solidmarkviewcomponent)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### as? {#as}

```ts
optional as: MarkViewDOMSpec;
```

##### component {#component}

```ts
component: SolidMarkViewComponent;
```

##### contentAs? {#contentas}

```ts
optional contentAs: MarkViewDOMSpec;
```

##### destroy()? {#destroy}

```ts
optional destroy: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

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

##### name {#name}

```ts
name: string;
```

The name of the mark type.

<!-- DEBUG memberWithGroups 10 -->

***

### SolidMarkViewProps {#solidmarkviewprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `MarkViewContextProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentRef {#contentref}

```ts
contentRef: MarkViewContentRef;
```

##### mark {#mark}

```ts
mark: Mark;
```

##### view {#view}

```ts
view: EditorView;
```

<!-- DEBUG memberWithGroups 10 -->

***

### SolidNodeViewOptions {#solidnodeviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineSolidNodeView](#definesolidnodeview).

#### Extends

- `CoreNodeViewUserOptions`\<[`SolidNodeViewComponent`](#solidnodeviewcomponent)\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### as? {#as-1}

```ts
optional as: NodeViewDOMSpec;
```

##### component {#component-1}

```ts
component: SolidNodeViewComponent;
```

##### contentAs? {#contentas-1}

```ts
optional contentAs: NodeViewDOMSpec;
```

##### deselectNode()? {#deselectnode}

```ts
optional deselectNode: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

##### destroy()? {#destroy-1}

```ts
optional destroy: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

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

##### name {#name-1}

```ts
name: string;
```

The name of the node type.

##### onUpdate()? {#onupdate}

```ts
optional onUpdate: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

##### selectNode()? {#selectnode}

```ts
optional selectNode: () => void;
```

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG memberWithGroups 10 -->

***

### SolidNodeViewProps {#solidnodeviewprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `NodeViewContextProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentRef {#contentref-1}

```ts
contentRef: NodeViewContentRef;
```

##### decorations {#decorations}

```ts
decorations: readonly Decoration[];
```

##### getPos() {#getpos}

```ts
getPos: () => undefined | number;
```

###### Returns

`undefined` \| `number`

<!-- DEBUG inheritance start kind=4096 -->

##### innerDecorations {#innerdecorations}

```ts
innerDecorations: DecorationSource;
```

##### node {#node}

```ts
node: ProseMirrorNode;
```

##### selected {#selected}

```ts
selected: boolean;
```

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

##### view {#view-1}

```ts
view: EditorView;
```

<!-- DEBUG memberWithGroups 10 -->

***

### UseExtensionOptions {#useextensionoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### editor? {#editor}

```ts
optional editor: MaybeAccessor<Editor<any>>;
```

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

##### priority? {#priority}

```ts
optional priority: Priority;
```

Optional priority to add the extension with.

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### MaybeAccessor\<T\> {#maybeaccessor}

```ts
type MaybeAccessor<T> = T | Accessor<T>;
```

T or a reactive/non-reactive function returning T

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

`T`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG inheritance start kind=2097152 -->

***

### ProseKitProps {#prosekitprops}

```ts
type ProseKitProps = ParentProps<{
  editor: Editor;
}>;
```

<!-- DEBUG inheritance start kind=2097152 -->

***

### SolidMarkViewComponent {#solidmarkviewcomponent}

```ts
type SolidMarkViewComponent = Component<SolidMarkViewProps>;
```

<!-- DEBUG inheritance start kind=2097152 -->

***

### SolidNodeViewComponent {#solidnodeviewcomponent}

```ts
type SolidNodeViewComponent = Component<SolidNodeViewProps>;
```

<!-- DEBUG inheritance start kind=2097152 -->

## Variables

### ProseKit {#prosekit}

```ts
const ProseKit: Component<ProseKitProps>;
```

The root component for a ProseKit editor.

<!-- DEBUG inheritance start kind=32 -->

## Functions

### defineSolidMarkView() {#definesolidmarkview}

```ts
function defineSolidMarkView(options: SolidMarkViewOptions): Extension;
```

Defines a mark view using a Solid component.

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

[`SolidMarkViewOptions`](#solidmarkviewoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](core.md#extension-1)

<!-- DEBUG inheritance start kind=4096 -->

***

### defineSolidNodeView() {#definesolidnodeview}

```ts
function defineSolidNodeView(options: SolidNodeViewOptions): Extension;
```

Defines a node view using a Solid component.

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

[`SolidNodeViewOptions`](#solidnodeviewoptions)

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
function useEditor<E>(options?: object): () => Editor<E>;
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

**Default**

```ts
false
```

</td>
</tr>
</tbody>
</table>

#### Returns

```ts
(): Editor<E>;
```

##### Returns

[`Editor`](core.md#editor)\<`E`\>

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=4096 -->

***

### useExtension() {#useextension}

```ts
function useExtension(extension: Accessor<
  | null
  | Extension<ExtensionTyping<any, any, any>>>, options?: UseExtensionOptions): void;
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

`Accessor`\< \| `null` \| [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>\>

</td>
<td>

The accessor to an extension to add to the editor. If it changes, the previous
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
function useKeymap(keymap: () => Keymap, options?: UseExtensionOptions): void;
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

() => [`Keymap`](core.md#keymap)

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
