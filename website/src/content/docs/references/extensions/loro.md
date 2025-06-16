---
title: prosekit/extensions/loro
sidebar:
  label: extensions/loro
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### LoroCursorOptions {#lorocursoroptions}

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

<a id="awareness"></a> `awareness`

</td>
<td>

`CursorAwareness`

</td>
</tr>
<tr>
<td>

<a id="createcursor"></a> `createCursor?`

</td>
<td>

(`user`: `` `${number}` ``) => [`Element`](https://developer.mozilla.org/docs/Web/API/Element)

</td>
</tr>
<tr>
<td>

<a id="createselection"></a> `createSelection?`

</td>
<td>

(`user`: `` `${number}` ``) => [`DecorationAttrs`](../pm/view.md#decorationattrs)

</td>
</tr>
<tr>
<td>

<a id="getselection"></a> `getSelection?`

</td>
<td>

(`state`: [`EditorState`](../pm/state.md#editorstate)) => [`Selection`](../pm/state.md#selection-1)

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### LoroOptions {#lorooptions}

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

<a id="awareness-1"></a> `awareness`

</td>
<td>

`CursorAwareness`

</td>
<td>

The Awareness instance.

</td>
</tr>
<tr>
<td>

<a id="cursor"></a> `cursor?`

</td>
<td>

[`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`LoroCursorOptions`](#lorocursoroptions), `"awareness"`\>

</td>
<td>

Extra options for `LoroCursorPlugin`.

</td>
</tr>
<tr>
<td>

<a id="doc"></a> `doc`

</td>
<td>

`LoroDocType`

</td>
<td>

The Loro instance handles the state of shared data.

</td>
</tr>
<tr>
<td>

<a id="sync"></a> `sync?`

</td>
<td>

[`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroSyncPluginProps`, `"doc"`\>

</td>
<td>

Extra options for `LoroSyncPlugin`.

</td>
</tr>
<tr>
<td>

<a id="undo"></a> `undo?`

</td>
<td>

[`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroUndoPluginProps`, `"doc"`\>

</td>
<td>

Extra options for the `LoroUndoPlugin`.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineLoro() {#defineloro}

```ts
function defineLoro(options: LoroOptions): LoroExtension;
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

`options`

</td>
<td>

[`LoroOptions`](#lorooptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`LoroExtension`

***

### defineLoroCommands() {#definelorocommands}

```ts
function defineLoroCommands(): LoroCommandsExtension;
```

#### Returns

`LoroCommandsExtension`

***

### defineLoroCursorPlugin() {#definelorocursorplugin}

```ts
function defineLoroCursorPlugin(options: LoroCursorOptions): PlainExtension;
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

`options`

</td>
<td>

[`LoroCursorOptions`](#lorocursoroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineLoroKeymap() {#definelorokeymap}

```ts
function defineLoroKeymap(): PlainExtension;
```

#### Returns

`PlainExtension`

***

### defineLoroSyncPlugin() {#definelorosyncplugin}

```ts
function defineLoroSyncPlugin(options: LoroSyncPluginProps): PlainExtension;
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

`options`

</td>
<td>

`LoroSyncPluginProps`

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineLoroUndoPlugin() {#defineloroundoplugin}

```ts
function defineLoroUndoPlugin(options: LoroUndoPluginProps): PlainExtension;
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

`options`

</td>
<td>

`LoroUndoPluginProps`

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG memberWithGroups 10 -->
