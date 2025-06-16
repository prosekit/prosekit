---
title: prosekit/svelte
sidebar:
  label: svelte
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

##### editor {#editor}

```ts
editor: Editor;
```

<!-- DEBUG memberWithGroups 10 -->

***

### SvelteMarkViewOptions {#sveltemarkviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineSvelteMarkView](#definesveltemarkview).

#### Extends

- `CoreMarkViewUserOptions`\<[`SvelteMarkViewComponent`](#sveltemarkviewcomponent)\>

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
component: SvelteMarkViewComponent;
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

### SvelteMarkViewProps {#sveltemarkviewprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `MarkViewContext`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentRef() {#contentref}

```ts
contentRef: (element: 
  | null
  | HTMLElement) => void;
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

`element`

</td>
<td>

 \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
MarkViewContext.contentRef
```

##### mark {#mark}

```ts
mark: Writable<Mark>;
```

###### Inherited from

```ts
MarkViewContext.mark
```

##### view {#view}

```ts
view: EditorView;
```

###### Inherited from

```ts
MarkViewContext.view
```

<!-- DEBUG memberWithGroups 10 -->

***

### SvelteNodeViewOptions {#sveltenodeviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineSvelteNodeView](#definesveltenodeview).

#### Extends

- `CoreNodeViewUserOptions`\<[`SvelteNodeViewComponent`](#sveltenodeviewcomponent)\>

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
component: SvelteNodeViewComponent;
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

### SvelteNodeViewProps {#sveltenodeviewprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `NodeViewContext`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentRef() {#contentref-1}

```ts
contentRef: (element: 
  | null
  | HTMLElement) => void;
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

`element`

</td>
<td>

 \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
NodeViewContext.contentRef
```

##### decorations {#decorations}

```ts
decorations: Writable<readonly Decoration[]>;
```

###### Inherited from

```ts
NodeViewContext.decorations
```

##### getPos() {#getpos}

```ts
getPos: () => undefined | number;
```

###### Returns

`undefined` \| `number`

###### Inherited from

```ts
NodeViewContext.getPos
```

##### innerDecorations {#innerdecorations}

```ts
innerDecorations: Writable<DecorationSource>;
```

###### Inherited from

```ts
NodeViewContext.innerDecorations
```

##### node {#node}

```ts
node: Writable<ProseMirrorNode>;
```

###### Inherited from

```ts
NodeViewContext.node
```

##### selected {#selected}

```ts
selected: Writable<boolean>;
```

###### Inherited from

```ts
NodeViewContext.selected
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
NodeViewContext.setAttrs
```

##### view {#view-1}

```ts
view: EditorView;
```

###### Inherited from

```ts
NodeViewContext.view
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

##### editor? {#editor-1}

```ts
optional editor: Editor<any>;
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

### SvelteMarkViewComponent {#sveltemarkviewcomponent}

```ts
type SvelteMarkViewComponent = Component<SvelteMarkViewProps>;
```

***

### SvelteNodeViewComponent {#sveltenodeviewcomponent}

```ts
type SvelteNodeViewComponent = Component<SvelteNodeViewProps>;
```

## Variables

### ProseKit {#prosekit}

```ts
const ProseKit: typeof SvelteComponent;
```

The root component for a ProseKit editor.

## Functions

### defineSvelteMarkView() {#definesveltemarkview}

```ts
function defineSvelteMarkView(options: SvelteMarkViewOptions): Extension;
```

Defines a mark view using a Svelte component.

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

[`SvelteMarkViewOptions`](#sveltemarkviewoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](core.md#extension-1)

***

### defineSvelteNodeView() {#definesveltenodeview}

```ts
function defineSvelteNodeView(options: SvelteNodeViewOptions): Extension;
```

Defines a node view using a Svelte component.

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

[`SvelteNodeViewOptions`](#sveltenodeviewoptions)

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
function useEditor<E>(options?: object): Readable<Editor<E>>;
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

`Readable`\<[`Editor`](core.md#editor)\<`E`\>\>

***

### useExtension() {#useextension}

```ts
function useExtension<T>(extension: Readable<null | T>, options?: UseExtensionOptions): void;
```

Add an extension to the editor.

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

`T` *extends* [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

</td>
<td>

[`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

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

`extension`

</td>
<td>

`Readable`\<`null` \| `T`\>

</td>
<td>

The store to an extension to add to the editor. If it changes, the previous
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
function useKeymap(keymapStore: Readable<Keymap>, options?: UseExtensionOptions): void;
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

`keymapStore`

</td>
<td>

`Readable`\<[`Keymap`](core.md#keymap)\>

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
