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

##### awareness {#awareness}

```ts
awareness: CursorAwareness;
```

<!-- DEBUG inheritance start kind=1024 -->

##### createCursor()? {#createcursor}

```ts
optional createCursor: (user: `${number}`) => Element;
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

`user`

</td>
<td>

`` `${number}` ``

</td>
</tr>
</tbody>
</table>

###### Returns

[`Element`](https://developer.mozilla.org/docs/Web/API/Element)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### createSelection()? {#createselection}

```ts
optional createSelection: (user: `${number}`) => DecorationAttrs;
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

`user`

</td>
<td>

`` `${number}` ``

</td>
</tr>
</tbody>
</table>

###### Returns

[`DecorationAttrs`](../pm/view.md#decorationattrs)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### getSelection()? {#getselection}

```ts
optional getSelection: (state: EditorState) => Selection;
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

`state`

</td>
<td>

[`EditorState`](../pm/state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](../pm/state.md#selection-1)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### LoroOptions {#lorooptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### awareness {#awareness-1}

```ts
awareness: CursorAwareness;
```

The Awareness instance.

<!-- DEBUG inheritance start kind=1024 -->

##### cursor? {#cursor}

```ts
optional cursor: Omit<LoroCursorOptions, "awareness">;
```

Extra options for `LoroCursorPlugin`.

<!-- DEBUG inheritance start kind=1024 -->

##### doc {#doc}

```ts
doc: LoroDocType;
```

The Loro instance handles the state of shared data.

<!-- DEBUG inheritance start kind=1024 -->

##### sync? {#sync}

```ts
optional sync: Omit<LoroSyncPluginProps, "doc">;
```

Extra options for `LoroSyncPlugin`.

<!-- DEBUG inheritance start kind=1024 -->

##### undo? {#undo}

```ts
optional undo: Omit<LoroUndoPluginProps, "doc">;
```

Extra options for the `LoroUndoPlugin`.

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=4096 -->

***

### defineLoroCommands() {#definelorocommands}

```ts
function defineLoroCommands(): LoroCommandsExtension;
```

#### Returns

`LoroCommandsExtension`

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

***

### defineLoroKeymap() {#definelorokeymap}

```ts
function defineLoroKeymap(): PlainExtension;
```

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
