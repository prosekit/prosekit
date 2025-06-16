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

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

The name of the mark type.

</td>
</tr>
</tbody>
</table>

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

<a id="name-1"></a> `name`

</td>
<td>

`string`

</td>
<td>

The name of the node type.

</td>
</tr>
</tbody>
</table>

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

<a id="editor"></a> `editor?`

</td>
<td>

[`MaybeAccessor`](#maybeaccessor)\<[`Editor`](core.md#editor)\<`any`\>\>

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
