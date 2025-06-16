---
title: prosekit/vue
sidebar:
  label: vue
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

`MaybeRefOrGetter`\<[`Editor`](core.md#editor)\<`any`\>\>

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

***

### VueMarkViewOptions {#vuemarkviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineVueMarkView](#definevuemarkview).

#### Extends

- `CoreMarkViewUserOptions`\<[`VueMarkViewComponent`](#vuemarkviewcomponent)\>

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

[`VueMarkViewComponent`](#vuemarkviewcomponent)

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

### VueMarkViewProps {#vuemarkviewprops}

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

`VNodeRef`

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

`ShallowRef`\<[`Mark`](pm/model.md#mark)\>

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

### VueNodeViewOptions {#vuenodeviewoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineVueNodeView](#definevuenodeview).

#### Extends

- `CoreNodeViewUserOptions`\<[`VueNodeViewComponent`](#vuenodeviewcomponent)\>

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

[`VueNodeViewComponent`](#vuenodeviewcomponent)

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

### VueNodeViewProps {#vuenodeviewprops}

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

`VNodeRef`

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

`ShallowRef`\<readonly [`Decoration`](pm/view.md#decoration)[]\>

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

`ShallowRef`\<[`DecorationSource`](pm/view.md#decorationsource)\>

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

`ShallowRef`\<[`ProseMirrorNode`](pm/model.md#prosemirrornode)\>

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

`ShallowRef`\<`boolean`\>

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

## Type Aliases

### VueMarkViewComponent {#vuemarkviewcomponent}

```ts
type VueMarkViewComponent = DefineComponent<VueMarkViewProps, any, any>;
```

***

### VueNodeViewComponent {#vuenodeviewcomponent}

```ts
type VueNodeViewComponent = DefineComponent<VueNodeViewProps, any, any>;
```

## Variables

### ProseKit {#prosekit}

```ts
const ProseKit: DefineSetupFnComponent<ProseKitProps>;
```

The root component for a ProseKit editor.

## Functions

### defineVueMarkView() {#definevuemarkview}

```ts
function defineVueMarkView(options: VueMarkViewOptions): Extension;
```

Defines a mark view using a Vue component.

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

[`VueMarkViewOptions`](#vuemarkviewoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](core.md#extension-1)

***

### defineVueNodeView() {#definevuenodeview}

```ts
function defineVueNodeView(options: VueNodeViewOptions): Extension;
```

Defines a node view using a Vue component.

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

[`VueNodeViewOptions`](#vuenodeviewoptions)

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
function useEditor<E>(options?: object): ShallowRef<Editor<E>>;
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

`ShallowRef`\<[`Editor`](core.md#editor)\<`E`\>\>

***

### useExtension() {#useextension}

```ts
function useExtension(extension: MaybeRefOrGetter<
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

`MaybeRefOrGetter`\< \| `null` \| [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>\>

</td>
<td>

The ref to an extension to add to the editor. If it changes, the previous
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
function useKeymap(keymap: MaybeRefOrGetter<Keymap>, options?: UseExtensionOptions): void;
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

`MaybeRefOrGetter`\<[`Keymap`](core.md#keymap)\>

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
