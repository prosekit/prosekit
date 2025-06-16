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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="editor"></a> `editor`

</td>
<td>

[`Editor`](core.md#editor)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="as"></a> `as?`

</td>
<td>

`MarkViewDOMSpec`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreMarkViewUserOptions.as
```

</td>
</tr>
<tr>
<td>

<a id="component"></a> `component`

</td>
<td>

[`SvelteMarkViewComponent`](#sveltemarkviewcomponent)

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreMarkViewUserOptions.component
```

</td>
</tr>
<tr>
<td>

<a id="contentas"></a> `contentAs?`

</td>
<td>

`MarkViewDOMSpec`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreMarkViewUserOptions.contentAs
```

</td>
</tr>
<tr>
<td>

<a id="destroy"></a> `destroy?`

</td>
<td>

() => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreMarkViewUserOptions.destroy
```

</td>
</tr>
<tr>
<td>

<a id="ignoremutation"></a> `ignoreMutation?`

</td>
<td>

(`mutation`: [`ViewMutationRecord`](pm/view.md#viewmutationrecord)) => `boolean` \| `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreMarkViewUserOptions.ignoreMutation
```

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

The name of the mark type.

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="contentref"></a> `contentRef`

</td>
<td>

(`element`: \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `void`

</td>
<td>

```ts
MarkViewContext.contentRef
```

</td>
</tr>
<tr>
<td>

<a id="mark"></a> `mark`

</td>
<td>

`Writable`\<[`Mark`](pm/model.md#mark)\>

</td>
<td>

```ts
MarkViewContext.mark
```

</td>
</tr>
<tr>
<td>

<a id="view"></a> `view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
<td>

```ts
MarkViewContext.view
```

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="as-1"></a> `as?`

</td>
<td>

`NodeViewDOMSpec`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.as
```

</td>
</tr>
<tr>
<td>

<a id="component-1"></a> `component`

</td>
<td>

[`SvelteNodeViewComponent`](#sveltenodeviewcomponent)

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.component
```

</td>
</tr>
<tr>
<td>

<a id="contentas-1"></a> `contentAs?`

</td>
<td>

`NodeViewDOMSpec`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.contentAs
```

</td>
</tr>
<tr>
<td>

<a id="deselectnode"></a> `deselectNode?`

</td>
<td>

() => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.deselectNode
```

</td>
</tr>
<tr>
<td>

<a id="destroy-1"></a> `destroy?`

</td>
<td>

() => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.destroy
```

</td>
</tr>
<tr>
<td>

<a id="ignoremutation-1"></a> `ignoreMutation?`

</td>
<td>

(`mutation`: [`ViewMutationRecord`](pm/view.md#viewmutationrecord)) => `boolean` \| `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.ignoreMutation
```

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`string`

</td>
<td>

The name of the node type.

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="onupdate"></a> `onUpdate?`

</td>
<td>

() => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.onUpdate
```

</td>
</tr>
<tr>
<td>

<a id="selectnode"></a> `selectNode?`

</td>
<td>

() => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.selectNode
```

</td>
</tr>
<tr>
<td>

<a id="setselection"></a> `setSelection?`

</td>
<td>

(`anchor`: `number`, `head`: `number`, `root`: \| [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.setSelection
```

</td>
</tr>
<tr>
<td>

<a id="stopevent"></a> `stopEvent?`

</td>
<td>

(`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.stopEvent
```

</td>
</tr>
<tr>
<td>

<a id="update"></a> `update?`

</td>
<td>

(`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `decorations`: readonly [`Decoration`](pm/view.md#decoration)[], `innerDecorations`: [`DecorationSource`](pm/view.md#decorationsource)) => `boolean` \| `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
CoreNodeViewUserOptions.update
```

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="contentref-1"></a> `contentRef`

</td>
<td>

(`element`: \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `void`

</td>
<td>

```ts
NodeViewContext.contentRef
```

</td>
</tr>
<tr>
<td>

<a id="decorations"></a> `decorations`

</td>
<td>

`Writable`\<readonly [`Decoration`](pm/view.md#decoration)[]\>

</td>
<td>

```ts
NodeViewContext.decorations
```

</td>
</tr>
<tr>
<td>

<a id="getpos"></a> `getPos`

</td>
<td>

() => `undefined` \| `number`

</td>
<td>

```ts
NodeViewContext.getPos
```

</td>
</tr>
<tr>
<td>

<a id="innerdecorations"></a> `innerDecorations`

</td>
<td>

`Writable`\<[`DecorationSource`](pm/view.md#decorationsource)\>

</td>
<td>

```ts
NodeViewContext.innerDecorations
```

</td>
</tr>
<tr>
<td>

<a id="node"></a> `node`

</td>
<td>

`Writable`\<[`ProseMirrorNode`](pm/model.md#prosemirrornode)\>

</td>
<td>

```ts
NodeViewContext.node
```

</td>
</tr>
<tr>
<td>

<a id="selected"></a> `selected`

</td>
<td>

`Writable`\<`boolean`\>

</td>
<td>

```ts
NodeViewContext.selected
```

</td>
</tr>
<tr>
<td>

<a id="setattrs"></a> `setAttrs`

</td>
<td>

(`attrs`: [`Attrs`](pm/model.md#attrs-7)) => `void`

</td>
<td>

```ts
NodeViewContext.setAttrs
```

</td>
</tr>
<tr>
<td>

<a id="view-1"></a> `view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
<td>

```ts
NodeViewContext.view
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### UseExtensionOptions {#useextensionoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="editor-1"></a> `editor?`

</td>
<td>

[`Editor`](core.md#editor)\<`any`\>

</td>
<td>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

</td>
</tr>
<tr>
<td>

<a id="priority"></a> `priority?`

</td>
<td>

[`Priority`](core.md#priority)

</td>
<td>

Optional priority to add the extension with.

</td>
</tr>
</tbody>
</table>

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
