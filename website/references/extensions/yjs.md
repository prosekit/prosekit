# prosekit/extensions/yjs

<a id="YjsCursorOptions" name="YjsCursorOptions"></a>

## YjsCursorOptions

Options for `y-prosemirror`'s `yCursorPlugin`.

### Extends

- [`YjsCursorPluginOptions`](yjs.md#YjsCursorPluginOptions)

### Properties

<a id="awareness" name="awareness"></a>

#### awareness

> **awareness**: `Awareness`

***

<a id="YjsOptions" name="YjsOptions"></a>

## YjsOptions

### Properties

<a id="awareness-1" name="awareness-1"></a>

#### awareness

> **awareness**: `Awareness`

The Awareness instance.

<a id="cursor" name="cursor"></a>

#### cursor?

> `optional` **cursor**: `object`

Options for `y-prosemirror`'s `yCursorPlugin`.

<a id="doc" name="doc"></a>

#### doc

> **doc**: `Doc`

The Yjs instance handles the state of shared data.

<a id="fragment" name="fragment"></a>

#### fragment?

> `optional` **fragment**: `YXmlFragment`

The Yjs XmlFragment to use. If not provided,
`doc.getXmlFragment('prosemirror')` will be used.

<a id="sync" name="sync"></a>

#### sync?

> `optional` **sync**: `YSyncOpts`

Options for `y-prosemirror`'s `ySyncPlugin`.

<a id="undo" name="undo"></a>

#### undo?

> `optional` **undo**: `object`

Options for the `y-prosemirror`'s `yUndoPlugin`.

***

<a id="YjsSyncOptions" name="YjsSyncOptions"></a>

## YjsSyncOptions

Options for `y-prosemirror`'s `ySyncPlugin`.

### Extends

- [`YjsSyncPluginOptions`](yjs.md#YjsSyncPluginOptions)

### Properties

<a id="fragment-1" name="fragment-1"></a>

#### fragment

> **fragment**: `YXmlFragment`

***

<a id="YjsUndoOptions" name="YjsUndoOptions"></a>

## YjsUndoOptions

Options for the `y-prosemirror`'s `yUndoPlugin`.

### Extends

- [`YjsUndoPluginOptions`](yjs.md#YjsUndoPluginOptions)

***

<a id="YjsCursorPluginOptions" name="YjsCursorPluginOptions"></a>

## YjsCursorPluginOptions

> **YjsCursorPluginOptions**: [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<*typeof* `yCursorPlugin`\>\[`1`\]\>

Options for `y-prosemirror`'s `yCursorPlugin`.

***

<a id="YjsSyncPluginOptions" name="YjsSyncPluginOptions"></a>

## YjsSyncPluginOptions

> **YjsSyncPluginOptions**: [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<*typeof* `ySyncPlugin`\>\[`1`\]\>

Options for `y-prosemirror`'s `ySyncPlugin`.

***

<a id="YjsUndoPluginOptions" name="YjsUndoPluginOptions"></a>

## YjsUndoPluginOptions

> **YjsUndoPluginOptions**: [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<*typeof* `originalYUndoPlugin`\>\[`0`\]\>

Options for the `y-prosemirror`'s `yUndoPlugin`.

***

<a id="defineYjs" name="defineYjs"></a>

## defineYjs()

> **defineYjs**(`options`): `YjsExtension`

### Parameters

• **options**: [`YjsOptions`](yjs.md#YjsOptions)

### Returns

`YjsExtension`

***

<a id="defineYjsCommands" name="defineYjsCommands"></a>

## defineYjsCommands()

> **defineYjsCommands**(): `YjsCommandsExtension`

### Returns

`YjsCommandsExtension`

***

<a id="defineYjsCursorPlugin" name="defineYjsCursorPlugin"></a>

## defineYjsCursorPlugin()

> **defineYjsCursorPlugin**(`options`): `PlainExtension`

### Parameters

• **options**: [`YjsCursorOptions`](yjs.md#YjsCursorOptions)

### Returns

`PlainExtension`

***

<a id="defineYjsKeymap" name="defineYjsKeymap"></a>

## defineYjsKeymap()

> **defineYjsKeymap**(): `PlainExtension`

### Returns

`PlainExtension`

***

<a id="defineYjsSyncPlugin" name="defineYjsSyncPlugin"></a>

## defineYjsSyncPlugin()

> **defineYjsSyncPlugin**(`options`): `PlainExtension`

### Parameters

• **options**: [`YjsSyncOptions`](yjs.md#YjsSyncOptions)

### Returns

`PlainExtension`

***

<a id="defineYjsUndoPlugin" name="defineYjsUndoPlugin"></a>

## defineYjsUndoPlugin()

> **defineYjsUndoPlugin**(`options`): `PlainExtension`

### Parameters

• **options**: [`YjsUndoOptions`](yjs.md#YjsUndoOptions)

### Returns

`PlainExtension`
