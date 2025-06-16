---
title: prosekit/extensions/yjs
sidebar:
  label: extensions/yjs
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### YjsCursorOptions {#yjscursoroptions}

<!-- DEBUG memberWithGroups 1 -->

Options for `y-prosemirror`'s `yCursorPlugin`.

#### Extends

- [`YjsCursorPluginOptions`](#yjscursorpluginoptions)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### awareness {#awareness}

```ts
awareness: Awareness;
```

<!-- DEBUG memberWithGroups 10 -->

***

### YjsOptions {#yjsoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### awareness {#awareness-1}

```ts
awareness: Awareness;
```

The Awareness instance.

##### cursor? {#cursor}

```ts
optional cursor: object;
```

Options for `y-prosemirror`'s `yCursorPlugin`.

##### doc {#doc}

```ts
doc: Doc;
```

The Yjs instance handles the state of shared data.

##### fragment? {#fragment}

```ts
optional fragment: YXmlFragment;
```

The Yjs XmlFragment to use. If not provided,
`doc.getXmlFragment('prosemirror')` will be used.

##### sync? {#sync}

```ts
optional sync: YSyncOpts;
```

Options for `y-prosemirror`'s `ySyncPlugin`.

##### undo? {#undo}

```ts
optional undo: object;
```

Options for the `y-prosemirror`'s `yUndoPlugin`.

<!-- DEBUG memberWithGroups 10 -->

***

### YjsSyncOptions {#yjssyncoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for `y-prosemirror`'s `ySyncPlugin`.

#### Extends

- [`YjsSyncPluginOptions`](#yjssyncpluginoptions)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### fragment {#fragment-1}

```ts
fragment: YXmlFragment;
```

<!-- DEBUG memberWithGroups 10 -->

***

### YjsUndoOptions {#yjsundooptions}

<!-- DEBUG memberWithGroups 1 -->

Options for the `y-prosemirror`'s `yUndoPlugin`.

#### Extends

- [`YjsUndoPluginOptions`](#yjsundopluginoptions)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### YjsCursorPluginOptions {#yjscursorpluginoptions}

```ts
type YjsCursorPluginOptions = NonNullable<Parameters<typeof yCursorPlugin>[1]>;
```

Options for `y-prosemirror`'s `yCursorPlugin`.

***

### YjsSyncPluginOptions {#yjssyncpluginoptions}

```ts
type YjsSyncPluginOptions = NonNullable<Parameters<typeof ySyncPlugin>[1]>;
```

Options for `y-prosemirror`'s `ySyncPlugin`.

***

### YjsUndoPluginOptions {#yjsundopluginoptions}

```ts
type YjsUndoPluginOptions = NonNullable<Parameters<typeof originalYUndoPlugin>[0]>;
```

Options for the `y-prosemirror`'s `yUndoPlugin`.

## Functions

### defineYjs() {#defineyjs}

```ts
function defineYjs(options: YjsOptions): YjsExtension;
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

[`YjsOptions`](#yjsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`YjsExtension`

***

### defineYjsCommands() {#defineyjscommands}

```ts
function defineYjsCommands(): YjsCommandsExtension;
```

#### Returns

`YjsCommandsExtension`

***

### defineYjsCursorPlugin() {#defineyjscursorplugin}

```ts
function defineYjsCursorPlugin(options: YjsCursorOptions): PlainExtension;
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

[`YjsCursorOptions`](#yjscursoroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineYjsKeymap() {#defineyjskeymap}

```ts
function defineYjsKeymap(): PlainExtension;
```

#### Returns

`PlainExtension`

***

### defineYjsSyncPlugin() {#defineyjssyncplugin}

```ts
function defineYjsSyncPlugin(options: YjsSyncOptions): PlainExtension;
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

[`YjsSyncOptions`](#yjssyncoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG memberWithGroups 10 -->
