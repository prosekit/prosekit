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

###### Inherited from

```ts
CoreMarkViewUserOptions.as
```

##### component {#component}

```ts
component: SolidMarkViewComponent;
```

###### Inherited from

```ts
CoreMarkViewUserOptions.component
```

##### contentAs? {#contentas}

```ts
optional contentAs: MarkViewDOMSpec;
```

###### Inherited from

```ts
CoreMarkViewUserOptions.contentAs
```

##### destroy()? {#destroy}

```ts
optional destroy: () => void;
```

###### Returns

`void`

###### Inherited from

```ts
CoreMarkViewUserOptions.destroy
```

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

###### Inherited from

```ts
CoreMarkViewUserOptions.ignoreMutation
```

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

###### Inherited from

```ts
MarkViewContextProps.contentRef
```

##### mark {#mark}

```ts
mark: Mark;
```

###### Inherited from

```ts
MarkViewContextProps.mark
```

##### view {#view}

```ts
view: EditorView;
```

###### Inherited from

```ts
MarkViewContextProps.view
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

###### Inherited from

```ts
CoreNodeViewUserOptions.as
```

##### component {#component-1}

```ts
component: SolidNodeViewComponent;
```

###### Inherited from

```ts
CoreNodeViewUserOptions.component
```

##### contentAs? {#contentas-1}

```ts
optional contentAs: NodeViewDOMSpec;
```

###### Inherited from

```ts
CoreNodeViewUserOptions.contentAs
```

##### deselectNode()? {#deselectnode}

```ts
optional deselectNode: () => void;
```

###### Returns

`void`

###### Inherited from

```ts
CoreNodeViewUserOptions.deselectNode
```

##### destroy()? {#destroy-1}

```ts
optional destroy: () => void;
```

###### Returns

`void`

###### Inherited from

```ts
CoreNodeViewUserOptions.destroy
```

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

###### Inherited from

```ts
CoreNodeViewUserOptions.ignoreMutation
```

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

###### Inherited from

```ts
CoreNodeViewUserOptions.onUpdate
```

##### selectNode()? {#selectnode}

```ts
optional selectNode: () => void;
```

###### Returns

`void`

###### Inherited from

```ts
CoreNodeViewUserOptions.selectNode
```

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

###### Inherited from

```ts
CoreNodeViewUserOptions.setSelection
```

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

###### Inherited from

```ts
CoreNodeViewUserOptions.stopEvent
```

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

###### Inherited from

```ts
CoreNodeViewUserOptions.update
```

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

###### Inherited from

```ts
NodeViewContextProps.contentRef
```

##### decorations {#decorations}

```ts
decorations: readonly Decoration[];
```

###### Inherited from

```ts
NodeViewContextProps.decorations
```

##### getPos() {#getpos}

```ts
getPos: () => undefined | number;
```

###### Returns

`undefined` \| `number`

###### Inherited from

```ts
NodeViewContextProps.getPos
```

##### innerDecorations {#innerdecorations}

```ts
innerDecorations: DecorationSource;
```

###### Inherited from

```ts
NodeViewContextProps.innerDecorations
```

##### node {#node}

```ts
node: ProseMirrorNode;
```

###### Inherited from

```ts
NodeViewContextProps.node
```

##### selected {#selected}

```ts
selected: boolean;
```

###### Inherited from

```ts
NodeViewContextProps.selected
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

###### Inherited from

```ts
NodeViewContextProps.setAttrs
```

##### view {#view-1}

```ts
view: EditorView;
```

###### Inherited from

```ts
NodeViewContextProps.view
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

***

### ProseKitProps {#prosekitprops}

```ts
type ProseKitProps = ParentProps<{
  editor: Editor;
}>;
```

***

### SolidMarkViewComponent {#solidmarkviewcomponent}

```ts
type SolidMarkViewComponent = Component<SolidMarkViewProps>;
```

***

### SolidNodeViewComponent {#solidnodeviewcomponent}

```ts
type SolidNodeViewComponent = Component<SolidNodeViewProps>;
```

## Variables

### ProseKit {#prosekit}

```ts
const ProseKit: Component<ProseKitProps>;
```

The root component for a ProseKit editor.

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

<!-- DEBUG memberWithGroups 10 -->
